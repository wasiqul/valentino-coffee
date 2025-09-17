import {test, expect} from '@playwright/test'
import * as products from './pages/shop';
import * as carts from './pages/cart';
import * as checkout from './pages/checkout';
import * as orderConfirmation from './pages/order-cofirmation';
import * as contact from './pages/contact';
import * as orderDetails from './pages/order-details';
import * as customerInfo from './data/customer-info';

test('Complete order', async ({page}) => {

  // Go to the products page
  await page.goto('/products');

  const shopPage = new products.ShopPage(page, 4);

  const productInCart = await shopPage.addToCart(); // Add the fourth product to the cart

  // Go to the cart page
  await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

  const cartPage = new carts.CartPage(page, productInCart.name!);

  // Verify the product name
  await cartPage.assertProduct();

  // Get the subtotal
  const subTotal = await cartPage.getSubTotal();

  // Verify the subtotal with the product price
  expect(subTotal).toEqual(productInCart.price);

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

  // Order confirmation
  const myOrder = new orderConfirmation.OrderConfirmationPage(page);
  
  // Get the order ID and go to the contact page
  const myOrderID = await myOrder.getOrderId();
  
  await myOrder.goToTrackOrder();

  const contactPage = new contact.ContactPage(page);
  
  // Go to the contact page and track the order
  await contactPage.trackOrder(myOrderID!);
  await page.waitForTimeout(1000); // Wait for the order tracking details to load

  const orderDetailsPage = new orderDetails.OrderDetailsPage(page);
  
  // Get the order details for verification
  const myOrderDetails = await orderDetailsPage.getOrderDetails();
  const customerFullName = myOrderDetails.customerName!.slice(6); // Remove "Name: " from the beginning

  // Verify the order details
  expect(myOrderDetails.orderItem).toEqual(productInCart.name);
  expect(customerFullName).toEqual(`${customerInfo.customer.contact.firstName} ${customerInfo.customer.contact.lastName}`);
})