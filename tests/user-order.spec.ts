import {test, expect} from '@playwright/test'
import * as products from './pages/shop';
import * as carts from './pages/cart';
import * as checkout from './pages/checkout';
import * as orderConfirmation from './pages/order-cofirmation';
import * as orderDetails from './pages/order-details';
import * as customerInfo from './data/customer-info';
import * as order from './pages/my-orders';


test('Authenticated user flow - with steps', async ({page}) => {

  // Go to the products page
  await page.goto('/products');
  await page.waitForLoadState('networkidle');
  
  let productInCart: Awaited<ReturnType<products.ShopPage['addToCart']>> 
  let myOrderID: Awaited<ReturnType<orderConfirmation.OrderConfirmationPage['getOrderId']>>

  await test.step('Add product to cart', async () => {
    
    const shopPage = new products.ShopPage(page, 1);
    
    productInCart = await shopPage.addToCart(); // Add the fourth product to the cart

  })


  await test.step('Go to cart page and verify added product with price', async () => {

    // Go to the cart page
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
    await page.waitForLoadState('networkidle');

    const cartPage = new carts.CartPage(page, productInCart.name!);

    // Verify the product name
    await cartPage.assertProduct();

    // Get the subtotal
    const subTotal = await cartPage.getSubTotal();

    // Verify the subtotal with the product price
    expect(subTotal).toEqual(productInCart.price);
  })


  await test.step('Fill up the checkout form and place order', async() => {
    
    // Go to the checkout page
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    
    const checkoutPage = new checkout.CheckoutPage(page);

    // Verify that contact info is prefilled with logged in user info
    await checkoutPage.checkContactInfo();

    // Fill the checkout form
    await checkoutPage.fillShippingAddress();
    await checkoutPage.fillPaymentInfo();
    await checkoutPage.placeOrder();
  })


  await test.step('Get the order confirmation', async()=> {

    // Order confirmation
    const myOrder = new orderConfirmation.OrderConfirmationPage(page);
    
    // Get the order ID and go to the contact page
    myOrderID = await myOrder.getOrderId();

    
  })


  await test.step('Track the order', async () => {

    // Goto my orders page
    await page.locator('div').filter({ hasText: /^Toggle navigation menu$/ }).locator('div').getByRole('button').click();
    await page.getByRole('menuitem', { name: 'My Orders' }).click();

    // Wait for the page to load
    await page.waitForURL('**/orders');

    const myOrdersPage = new order.MyOrdersPage(page);

    // Verify the order ID
    await myOrdersPage.verifyMyOrder(myOrderID!);
  })

})
