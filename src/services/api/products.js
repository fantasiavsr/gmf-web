/**
 * Products API Service
 *
 * Provides functions to interact with the Products API endpoints.
 * All functions use fetch() and return promises.
 */

import { getApiEndpoint, handleApiResponse, getHeaders } from './config.js';

/**
 * Fetch all products from the API
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Array>} Array of product objects
 */
export async function getProducts(signal) {
  const response = await fetch(getApiEndpoint('/products'), {
    method: 'GET',
    headers: getHeaders(),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data || [];
}

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Product object
 */
export async function getProduct(id, signal) {
  const response = await fetch(getApiEndpoint(`/products/${id}`), {
    method: 'GET',
    headers: getHeaders(),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Create a new product
 * @param {Object} productData - Product data (name, type, sku, price, available, status, description)
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Created product object
 */
export async function createProduct(productData, signal) {
  const response = await fetch(getApiEndpoint('/products'), {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(productData),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Update an existing product
 * @param {number} id - Product ID
 * @param {Object} productData - Partial product data to update
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Updated product object
 */
export async function updateProduct(id, productData, signal) {
  const response = await fetch(getApiEndpoint(`/products/${id}`), {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(productData),
    signal,
  });
  const data = await handleApiResponse(response);
  return data.data;
}

/**
 * Delete a product
 * @param {number} id - Product ID
 * @param {AbortSignal} [signal] - Optional AbortSignal for timeout/cancellation
 * @returns {Promise<Object>} Response message
 */
export async function deleteProduct(id, signal) {
  const response = await fetch(getApiEndpoint(`/products/${id}`), {
    method: 'DELETE',
    headers: getHeaders(),
    signal,
  });
  return handleApiResponse(response);
}
