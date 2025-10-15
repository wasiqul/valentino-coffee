import {test, expect} from '@playwright/test';

// Set the base URL for API tests
test.use({ baseURL: 'https://api.valentinos-magic-beans.click' })

test('API test guest workflow', async ({request}) => {
    // 1. Get all products
    const response = await request.get('/products');

    // assertions for products
    expect(response.status()).toBe(200);
    
    // get the response body
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('success', true);

    // get all products
    const allProducts = responseBody.data;

    
    // 2. Find product in stock
    const productInStock = allProducts.find( product => product.stock > 0 );
    //console.log('Product in stock:', productInStock);

    // 3. Create order with that product
    const guestEmail = 'abc@gm.com'
    const orderResponse = await request.post('/orders', {
        data: {
            customerDetails: {
                firstName: "Wahedul",
                lastName: "Haque",
                email: guestEmail,
                address: "Dhanmondi",
                city: "Dhaka",
                zipCode: "12095",
                country: "Bangladesh"
            },
            items: [
                {
                    productId: productInStock.id,
                    quantity: 1
                }
            ]
        }
    });

    // assert that product is created
    expect(orderResponse.status()).toBe(201);

    // get created order details
    const myOrder = await orderResponse.json();
    const myOrderId = myOrder.data.orderId;

    // 4. Fetch created order details
    const myOrderFetchResponse = await request.post('/orders/lookup',{
        data: { 
            orderId: myOrderId,
            email: guestEmail
        }
    })

    // assert that order fetch is successful
    expect(myOrderFetchResponse.status()).toBe(200);

    const myFetchedOrderBody = await myOrderFetchResponse.json();
    
    // assert fetched order details
    expect(myFetchedOrderBody).toHaveProperty('success', true);
})
