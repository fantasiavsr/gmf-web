/**
 * Pricing API Service
 *
 * Provides functions to interact with the Pricing API endpoints.
 * All functions use fetch() and return promises.
 */

import { getApiEndpoint, handleApiResponse, getHeaders } from './config.js';

/**
 * Fetch all pricing plans from the API
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Array>} Array of pricing plan objects
 */
export async function getPricingPlans(signal) {
  const response = await fetch(getApiEndpoint('/pricing'), {
    method: 'GET',
    headers: getHeaders(),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data || [];
}

/**
 * Fetch a single pricing plan by ID
 * @param {number} id - Pricing plan ID
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Pricing plan object
 */
export async function getPricingPlan(id, signal) {
  const response = await fetch(getApiEndpoint(`/pricing/${id}`), {
    method: 'GET',
    headers: getHeaders(),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Create a new pricing plan
 * @param {Object} pricingData - Pricing plan data
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Created pricing plan object
 */
export async function createPricingPlan(pricingData, signal) {
  const response = await fetch(getApiEndpoint('/pricing'), {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(pricingData),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Update an existing pricing plan
 * @param {number} id - Pricing plan ID
 * @param {Object} pricingData - Partial pricing plan data to update
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Updated pricing plan object
 */
export async function updatePricingPlan(id, pricingData, signal) {
  const response = await fetch(getApiEndpoint(`/pricing/${id}`), {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(pricingData),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Delete a pricing plan
 * @param {number} id - Pricing plan ID
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Response message
 */
export async function deletePricingPlan(id, signal) {
  const response = await fetch(getApiEndpoint(`/pricing/${id}`), {
    method: 'DELETE',
    headers: getHeaders(),
    signal,
  });
  return handleApiResponse(response);
}
