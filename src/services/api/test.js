/**
 * API Service Test
 *
 * Simple test to verify the API service layer works correctly.
 * This file is for manual testing and verification during development.
 *
 * Usage: Import these functions in your browser console or a test runner
 */

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from './products.js';

/**
 * Run all API tests
 */
export async function runApiTests() {
  console.log('🧪 Starting API tests...\n');

  try {
    // Test 1: Get all products
    console.log('Test 1: GET /api/products');
    const products = await getProducts();
    console.log(`✅ Retrieved ${products.length} products:`, products);
    console.log('');

    // Test 2: Get single product
    console.log('Test 2: GET /api/products/1');
    const product = await getProduct(1);
    console.log('✅ Retrieved product:', product);
    console.log('');

    // Test 3: Create product
    console.log('Test 3: POST /api/products');
    const newProduct = await createProduct({
      name: 'Test Product',
      type: 'Test',
      sku: 'TEST-001',
      price: '$99',
      available: 10,
      status: 'active',
      description: 'This is a test product.',
    });
    console.log('✅ Created product:', newProduct);
    const testProductId = newProduct.id;
    console.log('');

    // Test 4: Update product
    console.log(`Test 4: PUT /api/products/${testProductId}`);
    const updated = await updateProduct(testProductId, {
      available: 5,
      price: '$79',
    });
    console.log('✅ Updated product:', updated);
    console.log('');

    // Test 5: Delete product
    console.log(`Test 5: DELETE /api/products/${testProductId}`);
    const deleted = await deleteProduct(testProductId);
    console.log('✅ Deleted product:', deleted);
    console.log('');

    console.log('✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Export for testing
export default {
  runApiTests,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
