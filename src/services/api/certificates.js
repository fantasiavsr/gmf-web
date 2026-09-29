/**
 * Certificates API Service
 *
 * Provides functions for certificate lookups and protected operations.
 * Offline fallback is limited to network failures and server errors.
 */

import { getApiEndpoint, handleApiResponse, getHeaders } from './config.js';
import { MockCertificates } from '../../data/exampleData.js';

function isBackendUnavailable(error) {
  return error instanceof TypeError || error?.status >= 500;
}

async function withMockFallback(request, fallback) {
  try {
    const response = await request();
    const data = await handleApiResponse(response);
    return { data, isMockData: false };
  } catch (error) {
    if (!isBackendUnavailable(error)) throw error;
    return { data: fallback(), isMockData: true };
  }
}

function findMockCertificate(certificateNo) {
  return MockCertificates.find(
    (certificate) =>
      certificate.certificate_no.toLowerCase() === certificateNo.trim().toLowerCase(),
  );
}

/**
 * Fetch a public certificate preview by certificate number.
 * @param {string} certificateNo - Certificate number
 * @param {AbortSignal} [signal] - Optional request cancellation signal
 * @returns {Promise<Object>} Certificate preview and fallback status
 */
export async function getCertificatePreview(certificateNo, signal) {
  const result = await withMockFallback(async () => {
    return fetch(
      getApiEndpoint(`/certificates/preview/${encodeURIComponent(certificateNo)}`),
      {
        method: 'GET',
        headers: getHeaders(false),
        signal,
      },
    );
  }, () => ({
    certificate: findMockCertificate(certificateNo) || null,
  }));

  return result.isMockData
    ? { ...result.data, isMockData: true }
    : result.data;
}

/**
 * Fetch public certificate previews by welder identification number.
 * @param {string} welderId - Welder identification number
 * @param {AbortSignal} [signal] - Optional request cancellation signal
 * @returns {Promise<Object>} Certificate previews and fallback status
 */
export async function getCertificatesByWelderId(welderId, signal) {
  const query = new URLSearchParams({ welder_identification_no: welderId });
  const result = await withMockFallback(async () => {
    return fetch(
      getApiEndpoint(`/certificates/search?${query.toString()}`),
      {
        method: 'GET',
        headers: getHeaders(false),
        signal,
      },
    );
  }, () => ({
    certificates: MockCertificates.filter(
      (certificate) =>
        certificate.welder_identification_no.toLowerCase() ===
        welderId.trim().toLowerCase(),
    ),
  }));

  return {
    certificates: result.data.certificates || [],
    ...(result.isMockData && { isMockData: true }),
  };
}

/**
 * Fetch full certificate details (requires authentication).
 * @param {string} certificateNo - Certificate number
 * @param {AbortSignal} [signal] - Optional request cancellation signal
 * @returns {Promise<Object>} Certificate details and fallback status
 */
export async function getCertificateDetail(certificateNo, signal) {
  const result = await withMockFallback(async () => {
    return fetch(
      getApiEndpoint(`/certificates/${encodeURIComponent(certificateNo)}/detail`),
      {
        method: 'GET',
        headers: getHeaders(),
        signal,
      },
    );
  }, () => ({
    certificate: findMockCertificate(certificateNo) || null,
  }));

  return result.isMockData
    ? { ...result.data, isMockData: true }
    : result.data;
}

/**
 * Fetch certificates belonging to the logged-in user.
 * @param {AbortSignal} [signal] - Optional request cancellation signal
 * @returns {Promise<Object>} User certificates and fallback status
 */
export async function getUserCertificates(signal) {
  const result = await withMockFallback(async () => {
    return fetch(getApiEndpoint('/user/certificates'), {
      method: 'GET',
      headers: getHeaders(),
      signal,
    });
  }, () => ({ certificates: MockCertificates }));

  return result.isMockData
    ? { ...result.data, isMockData: true }
    : result.data;
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
