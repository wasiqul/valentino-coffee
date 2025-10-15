import {test, expect} from '@playwright/test';
import { orderData } from '../data/api-json';

// Set the base URL for API tests
test.use({ baseURL: 'https://api.valentinos-magic-beans.click' })


test('API test GET product', async ({request}) => {
    const response = await request.get('/products');
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
})

test('API test POST order', async ({request}) => {
    const orderResponse = await request.post('/orders', {
        data: orderData
    })

    expect(orderResponse.status()).toBe(201);

    const orderResponseBody = await orderResponse.json();
    expect(orderResponseBody).toHaveProperty('success', true);
    expect(orderResponseBody).toHaveProperty('data');
})

test('API test POST order fetch', async ({request}) => {
    const ordersFetchResponse = await request.post('/orders/lookup',{
        data: { 
            orderId: '5B069D36',
            email: '8249e6cd-bda0-4456-a6be-1e74520082da@mailslurp.world'
        }
    })
    expect(ordersFetchResponse.status()).toBe(200);

    const ordersFetchResponseBody = await ordersFetchResponse.json();
    expect(ordersFetchResponseBody).toHaveProperty('success', true);
    expect(ordersFetchResponseBody).toHaveProperty('data.orderId', '5B069D36');
})
