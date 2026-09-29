/**
 * Certificates API Service
 *
 * Provides functions for certificate lookups and protected operations.
 */

import { getApiEndpoint, handleApiResponse, getHeaders } from './config.js';

/**
 * Fetch a public certificate preview by certificate number.
 * @param {string} certificateNo - Certificate number
 * @param {AbortSignal} [signal] - Optional request cancellation signal
 * @returns {Promise<Object>} Certificate preview and fallback status
 */
export async function getCertificatePreview(certificateNo, signal) {
  const response = await fetch(
    getApiEndpoint(`/certificates/preview/${encodeURIComponent(certificateNo)}`),
    {
      method: 'GET',
      headers: getHeaders(false),
      signal,
    },
  );
  return handleApiResponse(response);
}

/**
 * Fetch public certificate previews by welder identification number.
 * @param {string} welderId - Welder identification number
 * @param {AbortSignal} [signal] - Optional request cancellation signal
 * @returns {Promise<Object>} Certificate previews and fallback status
 */
export async function getCertificatesByWelderId(welderId, signal) {
  const query = new URLSearchParams({ welder_identification_no: welderId });
  const response = await fetch(
    getApiEndpoint(`/certificates/search?${query.toString()}`),
    {
      method: 'GET',
      headers: getHeaders(false),
      signal,
    },
  );
  const data = await handleApiResponse(response);
  return data.certificates || [];
}

/**
 * Fetch full certificate details (requires authentication).
 * @param {string} certificateNo - Certificate number
 * @param {AbortSignal} [signal] - Optional request cancellation signal
 * @returns {Promise<Object>} Certificate details and fallback status
 */
export async function getCertificateDetail(certificateNo, signal) {
  const response = await fetch(
    getApiEndpoint(`/certificates/${encodeURIComponent(certificateNo)}/detail`),
    {
      method: 'GET',
      headers: getHeaders(),
      signal,
    },
  );
  return handleApiResponse(response);
}

/**
 * Fetch certificates belonging to the logged-in user.
 * @param {AbortSignal} [signal] - Optional request cancellation signal
 * @returns {Promise<Object>} User certificates and fallback status
 */
export async function getUserCertificates(signal) {
  const response = await fetch(getApiEndpoint('/user/certificates'), {
    method: 'GET',
    headers: getHeaders(),
    signal,
  });
  return handleApiResponse(response);
}

/**
 * Request a certificate PDF download (requires authentication).
 * @param {string} certificateNo - Certificate number
 * @param {AbortSignal} [signal] - Optional request cancellation signal
 * @returns {Promise<Object>} API download response
 */
export async function downloadCertificatePdf(certificateNo, signal) {
  const response = await fetch(
    getApiEndpoint(`/certificates/${encodeURIComponent(certificateNo)}/pdf`),
    {
      method: 'GET',
      headers: getHeaders(),
      signal,
    }
  );
  return handleApiResponse(response);
}
