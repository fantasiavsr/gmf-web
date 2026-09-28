/**
 * API Configuration
 *
 * Determines which API URL to use based on environment variables.
 * In development/demo mode, the API might not be available, so we handle gracefully.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const DEBUG_API_ERRORS = import.meta.env.VITE_DEBUG_API_ERRORS === 'true';

export const apiConfig = {
  baseUrl: API_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT, 10) || 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

/**
 * Get headers with optional authentication token
 * @param {boolean} includeAuth - Whether to include Authorization header
 * @returns {Object} Headers object
 */
export function getHeaders(includeAuth = true) {
  const headers = { ...apiConfig.headers };

  if (includeAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Helper to construct full API endpoint URLs
 */
export function getApiEndpoint(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiConfig.baseUrl}${cleanPath}`;
}

/**
 * Patterns that indicate an infrastructure/debug error that must not be shown to users.
 */
const INFRA_PATTERNS = [
  /SQLSTATE/i,
  /Connection/i,
  /query failed/i,
  /driver/i,
  / PDO/i,
  /Exception/i,
  /stack trace/i,
  /vendor\//i,
  /database/i,
  /hy000/i,
  /Access denied/i,
  /No such file/i,
];

/**
 * Check if a message contains infrastructure details that must not be shown to users.
 */
function isInfraError(message) {
  return typeof message === 'string' && INFRA_PATTERNS.some((p) => p.test(message));
}

/**
 * Normalize an API error into a safe, user-friendly message.
 * Preserves validation error details (field-level messages).
 * Sanitizes infrastructure/debug errors.
 */
export function safeApiMessage(error, fallback) {
  const raw = error?.message || '';
  const status = error?.status;

  // Validation errors (422) — keep backend messages, they are safe for users
  if (error?.errors && Object.keys(error.errors).length > 0) {
    return raw;
  }

  // Infrastructure/debug errors — never show to users
  if (isInfraError(raw)) {
    if (status === 404) return 'The requested item could not be found.';
    if (status === 401) return 'Please log in to continue.';
    if (status === 403) return 'You do not have permission to do this.';
    if (status === 429) return 'Too many requests. Please try again later.';
    if (status >= 500) return 'Unable to connect to the server. Please try again.';
    return 'Something went wrong. Please try again.';
  }

  // Safe status-based messages for non-infra errors
  if (status === 404) return 'The requested item could not be found.';
  if (status === 401) return 'Please log in to continue.';
  if (status === 403) return 'You do not have permission to do this.';
  if (status === 429) return 'Too many requests. Please try again later.';
  if (status >= 500) return 'Unable to connect to the server. Please try again.';

  // Return original message if it looks safe (short, no suspicious patterns)
  if (raw && raw.length < 200 && !isInfraError(raw)) {
    return raw;
  }

  return fallback || 'Something went wrong. Please try again.';
}

/**
 * Helper to handle API responses and errors
 */
export async function handleApiResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP ${response.status}: ${response.statusText}`,
    }));

    // Development/debug only: log the original backend error.
    // Disable VITE_DEBUG_API_ERRORS in production.
    if (DEBUG_API_ERRORS) {
      console.error('[API Error]', {
        status: response.status,
        message: error.message,
        errors: error.errors,
      });
    }

    const requestError = new Error(
      safeApiMessage(
        {
          message: error.message,
          status: response.status,
          errors: error.errors,
        },
        'API request failed'
      )
    );

    requestError.status = response.status;
    requestError.errors = error.errors || {};

    throw requestError;
  }

  return response.json();
}
