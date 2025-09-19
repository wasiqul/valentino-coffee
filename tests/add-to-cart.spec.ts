import {test, expect} from '@playwright/test'
import * as products from './pages/shop';
import * as carts from './pages/cart';
import * as checkout from './pages/checkout';
import * as orderConfirmation from './pages/order-cofirmation';
import * as contact from './pages/contact';
import * as orderDetails from './pages/order-details';
import * as customerInfo from './data/customer-info';

test('Complete and track order - with steps', async ({page}) => {

  // Go to the products page
  await page.goto('/products');
  
  let productInCart: Awaited<ReturnType<products.ShopPage['addToCart']>> 
  let myOrderID: Awaited<ReturnType<orderConfirmation.OrderConfirmationPage['getOrderId']>>

  test.step('Add product to cart', async () => {
    
    const shopPage = new products.ShopPage(page, 1);
    
    productInCart = await shopPage.addToCart(); // Add the fourth product to the cart
  })
  await page.waitForTimeout(3000);  // Pause upon test step execution


  test.step('Go to cart page and verify added product with price', async () => {
    // Go to the cart page
    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    const cartPage = new carts.CartPage(page, productInCart.name!);

    // Verify the product name
    await cartPage.assertProduct();

    // Get the subtotal
    const subTotal = await cartPage.getSubTotal();

    // Verify the subtotal with the product price
    expect(subTotal).toEqual(productInCart.price);
  })
  await page.waitForTimeout(1000);  // Pause upon test step execution


  test.step('Fill up the checkout form and place order', async() => {
    // Go to the checkout page
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    const checkoutPage = new checkout.CheckoutPage(page);

    // Fill the checkout form
    await checkoutPage.fillContactInfo();
    await page.waitForTimeout(1000); // wait for the contact info to be processed
    await checkoutPage.fillShippingAddress();
    await page.waitForTimeout(1000); // wait for the shipping address to be processed
    await checkoutPage.fillPaymentInfo();
    await checkoutPage.placeOrder();
  })
  await page.waitForTimeout(2000);  // Pause upon test step execution


  test.step('Get the order confirmation', async()=> {
    // Order confirmation
    const myOrder = new orderConfirmation.OrderConfirmationPage(page);
    
    // Get the order ID and go to the contact page
    myOrderID = await myOrder.getOrderId();
    
    await myOrder.goToTrackOrder();
  })
  await page.waitForTimeout(2000)  // Pause upon test step execution


  test.step('Track the order', async () => {
    const contactPage = new contact.ContactPage(page);
  
    // Go to the contact page and track the order
    await contactPage.trackOrder(myOrderID!);
  })
  await page.waitForTimeout(1000);  // Pause upon test step execution


  test.step('Verify order details', async () => {
    const orderDetailsPage = new orderDetails.OrderDetailsPage(page);
    
    // Get the order details for verification
    const myOrderDetails = await orderDetailsPage.getOrderDetails();
    const customerFullName = myOrderDetails.customerName!.slice(6); // Remove "Name: " from the beginning

    // Verify the order details
    expect(myOrderDetails.orderItem).toEqual(productInCart.name);
    expect(customerFullName).toEqual(`${customerInfo.customer.contact.firstName} ${customerInfo.customer.contact.lastName}`);
  })
  await page.waitForTimeout(1000)  // Pause upon test step execution

})