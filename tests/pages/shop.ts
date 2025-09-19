import { Locator, Page } from "@playwright/test";

export class ShopPage {
    productWrapperLocator: Locator;
    productNameLocator: Locator;
    productPriceLocator: Locator;
    addProductToCartButtonLocator: Locator;

    constructor(page: Page, productIndex: number) {
        this.productWrapperLocator = page.locator('.p-6').nth(productIndex);
        this.productNameLocator = this.productWrapperLocator.getByRole('heading');
        this.productPriceLocator = this.productWrapperLocator.getByText('$');
        this.addProductToCartButtonLocator = this.productWrapperLocator.getByRole('button', { name: 'Add to cart' });
    }

    async addToCart(){
        // Essentials for the product
        const productName = await this.productNameLocator.textContent();
        const productPriceWithSign = await this.productPriceLocator.textContent();
        const productPrice = Number(productPriceWithSign!.slice(1)); // Remove the dollar sign
    
        // Add the product to the cart
        await this.addProductToCartButtonLocator.click();

        return { name: productName, price: productPrice };
    }
}

