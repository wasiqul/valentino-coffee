import { Page } from "@playwright/test";

export async function addToCartProduct(page: Page, productIndex: number) {
    
    // Get product wrapper
    const productWrapper = page.locator('.p-6').nth(productIndex);
    
    // Essentials for the product
    const productName = await productWrapper.getByRole('heading').textContent();
    const productPriceWithSign = await productWrapper.getByText('$').textContent();
    const productPrice = Number(productPriceWithSign!.slice(1)); // Remove the dollar sign
    
    // Add the product to the cart
    await productWrapper.getByRole('button', { name: 'Add to cart' }).click();

    return { name: productName, price: productPrice };
}