import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    productNameLocator: Locator;
    subTotalLocator: Locator;

    constructor(page: Page, addedProductName: string) {
        this.productNameLocator = page.getByRole('heading', { name: addedProductName });
        this.subTotalLocator = page.getByText('Subtotal').locator('..').locator('.font-semibold');
    }

    async assertProduct() {
        // Verify the added product name
        await expect(this.productNameLocator).toBeVisible();
    }

    async getSubTotal() {
        // Get the subtotal
        const subTotalWithSign = await this.subTotalLocator.textContent();
        return Number(subTotalWithSign!.slice(1)); // Remove the dollar sign
    }
}



