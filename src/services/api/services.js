/**
 * Services API Service
 *
 * Provides functions to interact with the Services API endpoints.
 * All functions use fetch() and return promises.
 */

import { getApiEndpoint, handleApiResponse, getHeaders } from './config.js';

/**
 * Fetch all services from the API
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Array>} Array of service objects
 */
export async function getServices(signal) {
  const response = await fetch(getApiEndpoint('/services'), {
    method: 'GET',
    headers: getHeaders(),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data || [];
}

/**
 * Fetch a single service by ID
 * @param {number} id - Service ID
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Service object
 */
export async function getService(id, signal) {
  const response = await fetch(getApiEndpoint(`/services/${id}`), {
    method: 'GET',
    headers: getHeaders(),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Create a new service
 * @param {Object} serviceData - Service data
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Created service object
 */
export async function createService(serviceData, signal) {
  const response = await fetch(getApiEndpoint('/services'), {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(serviceData),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Update an existing service
 * @param {number} id - Service ID
 * @param {Object} serviceData - Partial service data to update
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Updated service object
 */
export async function updateService(id, serviceData, signal) {
  const response = await fetch(getApiEndpoint(`/services/${id}`), {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(serviceData),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Delete a service
 * @param {number} id - Service ID
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Response message
 */
export async function deleteService(id, signal) {
  const response = await fetch(getApiEndpoint(`/services/${id}`), {
    method: 'DELETE',
    headers: getHeaders(),
    signal,
  });
  return handleApiResponse(response);
}
