import {test, expect} from '@playwright/test'
import * as products from './pages/shop';
import * as carts from './pages/cart';
import * as checkout from './pages/checkout';
import * as orderConfirmation from './pages/order-cofirmation';
import * as contact from './pages/contact';
import * as orderDetails from './pages/order-details';

test('Add product to cart', async ({page}) => {
  // Go to the products page
  await page.goto('/products');

  const productInCart = await products.addToCart(page, 3); // Add the thierd product to the cart

  // Go to the cart page
  await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
  await expect(page).toHaveURL('https://valentinos-magic-beans.click/cart');

  // Verify the product name
  await carts.assertProduct(page, productInCart.name!);

  // Get the subtotal
  const subTotal = await carts.getSubTotal(page);

  // Verify the subtotal with the product price
  expect(subTotal).toEqual(productInCart.price);
})

test('Complete order', async ({page}) => {
  // Go to the products page
  await page.goto('/products');

  const productInCart = await products.addToCart(page, 4); // Add the fourth product to the cart

  // Go to the cart page
  await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

  // Verify the product name
  await carts.assertProduct(page, productInCart.name!);

  // Get the subtotal
  const subTotal = await carts.getSubTotal(page);

  // Verify the subtotal with the product price
  expect(subTotal).toEqual(productInCart.price);

  // Go to the checkout page
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

  // Fill the checkout form
  await checkout.fillContactInfo(page);
  await checkout.fillShippingAddress(page);
  await checkout.fillPaymentInfo(page);
  await checkout.placeOrder(page);

  // Order confirmation
  const myOrderID = await orderConfirmation.getOrderId(page);
  await orderConfirmation.goToTrackOrder(page);

  // Go to the contact page and track the order
  await contact.trackOrder(page, myOrderID!);

  // Get the order details for verification
  const myOrderDetails = await orderDetails.getOrderDetails(page);
  const customerFullName = myOrderDetails.customerName!.slice(6); // Remove "Name: " from the beginning

  // Verify the order details
  expect(myOrderDetails.orderItem).toEqual(productInCart.name);
  expect(customerFullName).toEqual(`${checkout.customer.contact.firstName} ${checkout.customer.contact.lastName}`);
})