import {test, expect} from '@playwright/test'

test('Add product to cart', async ({page}) => {

  await page.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Valentino's Magic Beans/);

  // Go to the shop page
  await page.getByRole('link', { name: 'Shop', exact: true }).click();
  await expect(page).toHaveURL('https://valentinos-magic-beans.click/products');

  // Get product wrappers
  const firstProductWrapper = page.locator('.p-6').first();
  const lastProductWrapper = page.locator('.p-6').last();

  // Essentials for the first product
  const firstProductName = await firstProductWrapper.getByRole('heading').textContent();
  const firstProductPriceWithSign = await firstProductWrapper.getByText('$').textContent();
  const firstProductPrice = Number(firstProductPriceWithSign!.slice(1)); // Remove the dollar sign

  // Add the first product to the cart
  await firstProductWrapper.getByRole('button', { name: 'Add to cart' }).click();

  // Go to the cart page
  await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
  await expect(page).toHaveURL('https://valentinos-magic-beans.click/cart');

  // Verify the product name
  await expect(page.getByRole('heading', { name: firstProductName! })).toBeVisible();

  // Get the subtotal
  const subtotalWithSign = await page.getByText('Subtotal').locator('..').locator('.font-semibold').textContent();
  const subtotal = Number(subtotalWithSign!.slice(1)); // Remove the dollar sign
  
  // Verify the subtotal with the product price
  expect(subtotal).toEqual(firstProductPrice);

  // Essentials for the last product
  /*
  const lastProductName = await lastProductWrapper.getByRole('heading').textContent();
  console.log(lastProductName)
  const lastProductPriceWithSign = await lastProductWrapper.getByText('$').textContent();
  const lastProductPrice = Number(lastProductPriceWithSign!.slice(1)); // Remove the dollar sign
  console.log(lastProductPrice)
  */
})