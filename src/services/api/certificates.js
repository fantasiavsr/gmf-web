import { getApiEndpoint, getHeaders, handleApiResponse } from './config.js';

/**
 * Fetch a public certificate preview by certificate number.
 */
export async function getCertificatePreview(certificateNo, signal) {
  const response = await fetch(
    getApiEndpoint(`/certificates/preview/${encodeURIComponent(certificateNo)}`),
    {
      method: 'GET',
      headers: getHeaders(false),
      signal,
    }
  );
  return handleApiResponse(response);
}

/**
 * Fetch public certificate previews by welder identification number.
 */
export async function getCertificatesByWelderId(welderId, signal) {
  const query = new URLSearchParams({ welder_identification_no: welderId });
  const response = await fetch(
    getApiEndpoint(`/certificates/search?${query.toString()}`),
    {
      method: 'GET',
      headers: getHeaders(false),
      signal,
    }
  );
  const data = await handleApiResponse(response);
  return data.certificates || [];
}

/**
 * Get full certificate details (requires authentication for sensitive data)
 * Only shows detailed WQT information to the owner or admin
 */
export async function getCertificateDetail(certificateNo, signal) {
  const response = await fetch(
    getApiEndpoint(`/certificates/${encodeURIComponent(certificateNo)}/detail`),
    {
      method: 'GET',
      headers: getHeaders(),
      signal,
    }
  );
  return handleApiResponse(response);
}

/**
 * Get all certificates for the logged-in user
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
 * Download certificate PDF (requires authentication)
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
