/**
 * Data Source Abstraction Layer
 *
 * Provides a unified interface for fetching data from either mock or API sources.
 * Components use this layer without knowing which source is active.
 *
 * Configuration:
 * - VITE_DATA_SOURCE=mock  → uses local mock data
 * - VITE_DATA_SOURCE=api   → uses Laravel API (with fallback to mock if API fails)
 *
 * IMPORTANT: Environment variable precedence in Vite:
 * .env.local > .env
 *
 * So if both files exist:
 * - .env.local takes precedence (used for local development)
 * - .env is used as fallback (used for production/Vercel)
 *
 * To switch modes:
 * 1. Delete or rename .env.local to use .env (mock mode for Vercel)
 * 2. Keep .env.local to use API mode (local development with real backend)
 */

import { MockProducts, MockServices, MockPricing } from '../data/exampleData.js';
import * as productsApi from './api/products.js';
import * as servicesApi from './api/services.js';
import * as pricingApi from './api/pricing.js';

// Determine which data source to use
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || 'mock';
const ENABLE_API_FALLBACK = true; // If API fails, fallback to mock data
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT, 10) || 5000; // Default: 5 seconds

console.log(`📦 Data source: ${DATA_SOURCE.toUpperCase()}`);
console.log(`⚠️  API Fallback: ${ENABLE_API_FALLBACK ? 'ENABLED' : 'DISABLED'}`);
console.log(`⏱️  API Timeout: ${API_TIMEOUT}ms`);

// Track whether the last API call fell back to mock data
let lastCallUsedFallback = false;

/**
 * Helper to fetch from API with timeout and fallback to mock on error
 */
async function fetchFromApiWithFallback(apiCall, fallbackData) {
  if (DATA_SOURCE !== 'api') {
    lastCallUsedFallback = true;
    return fallbackData();
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const result = await apiCall(controller.signal);
    lastCallUsedFallback = false;
    return result;
  } catch (error) {
    lastCallUsedFallback = true;
    if (error.name === 'AbortError') {
      console.warn(`⏱️  API request timed out after ${API_TIMEOUT}ms, falling back to mock data`);
    } else {
      console.warn(`⚠️  API request failed, falling back to mock data:`, error.message);
    }
    if (ENABLE_API_FALLBACK) {
      return fallbackData();
    } else {
      throw error;
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Services Data Source (placeholder for future phases)
 */
function mockRecordList(records) {
  return records.map((record, index) => ({
    id: record.id || index + 1,
    ...record,
    created_at: record.created_at || new Date().toISOString(),
    updated_at: record.updated_at || new Date().toISOString(),
  }));
}

function mockCreate(records, data) {
  const record = {
    id: records.length ? Math.max(...records.map((item) => item.id || 0)) + 1 : 1,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  records.push(record);
  return record;
}

function mockUpdate(records, id, data, label) {
  const index = records.findIndex((item) => item.id === id);
  if (index < 0) throw new Error(`${label} ${id} not found`);
  records[index] = { ...records[index], ...data, updated_at: new Date().toISOString() };
  return records[index];
}

function mockDelete(records, id, label) {
  const index = records.findIndex((item) => item.id === id);
  if (index < 0) throw new Error(`${label} ${id} not found`);
  records.splice(index, 1);
  return { message: `${label} deleted successfully` };
}

/**
 * Products Data Source
 *
 * Provides a consistent interface regardless of the underlying source.
 * All functions return promises that resolve to the same shape.
 */
export const productDataSource = {
  async getAll() {
    return fetchFromApiWithFallback(
      (signal) => productsApi.getProducts(signal),
      () => Promise.resolve(mockRecordList(MockProducts))
    );
  },
  async create(data) {
    return fetchFromApiWithFallback(
      (signal) => productsApi.createProduct(data, signal),
      () => Promise.resolve(mockCreate(MockProducts, data))
    );
  },
  async update(id, data) {
    return fetchFromApiWithFallback(
      (signal) => productsApi.updateProduct(id, data, signal),
      () => Promise.resolve(mockUpdate(MockProducts, id, data, 'Product'))
    );
  },
  async delete(id) {
    return fetchFromApiWithFallback(
      (signal) => productsApi.deleteProduct(id, signal),
      () => Promise.resolve(mockDelete(MockProducts, id, 'Product'))
    );
  },
};

/**
 * Services Data Source
 *
 * Provides a consistent interface regardless of the underlying source.
 * All functions return promises that resolve to the same shape.
 */
export const serviceDataSource = {
  async getAll() {
    return fetchFromApiWithFallback(
      (signal) => servicesApi.getServices(signal),
      () => Promise.resolve(mockRecordList(MockServices))
    );
  },
  async create(data) {
    return fetchFromApiWithFallback(
      (signal) => servicesApi.createService(data, signal),
      () => Promise.resolve(mockCreate(MockServices, data))
    );
  },
  async update(id, data) {
    return fetchFromApiWithFallback(
      (signal) => servicesApi.updateService(id, data, signal),
      () => Promise.resolve(mockUpdate(MockServices, id, data, 'Service'))
    );
  },
  async delete(id) {
    return fetchFromApiWithFallback(
      (signal) => servicesApi.deleteService(id, signal),
      () => Promise.resolve(mockDelete(MockServices, id, 'Service'))
    );
  },
};

/**
 * Pricing plans data source.
 */
export const pricingDataSource = {
  async getAll() {
    return fetchFromApiWithFallback(
      (signal) => pricingApi.getPricingPlans(signal),
      () => Promise.resolve(mockRecordList(MockPricing))
    );
  },
  async create(data) {
    return fetchFromApiWithFallback(
      (signal) => pricingApi.createPricingPlan(data, signal),
      () => Promise.resolve(mockCreate(MockPricing, data))
    );
  },
  async update(id, data) {
    return fetchFromApiWithFallback(
      (signal) => pricingApi.updatePricingPlan(id, data, signal),
      () => Promise.resolve(mockUpdate(MockPricing, id, data, 'Pricing plan'))
    );
  },
  async delete(id) {
    return fetchFromApiWithFallback(
      (signal) => pricingApi.deletePricingPlan(id, signal),
      () => Promise.resolve(mockDelete(MockPricing, id, 'Pricing plan'))
    );
  },
};

/**
 * Get the current data source mode
 */
export function getDataSourceMode() {
  return DATA_SOURCE;
}

/**
 * Check if using mock data
 */
export function isUsingMockData() {
  return DATA_SOURCE === 'mock';
}

/**
 * Check if the last API call fell back to mock data
 */
export function lastCallUsedMockFallback() {
  return lastCallUsedFallback;
}
