import {test, expect} from '@playwright/test'
import * as products from './pages/shop';
import * as carts from './pages/cart';

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