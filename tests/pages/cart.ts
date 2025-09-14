import { Page, expect } from "@playwright/test";

export async function assertProduct(page: Page, addedProductName: string) {
    // Verify the added product name
    await expect(page.getByRole('heading', { name: addedProductName })).toBeVisible();
}

export async function getSubTotal(page: Page) {
    // Get the subtotal
    const subTotalWithSign = await page.getByText('Subtotal').locator('..').locator('.font-semibold').textContent();
    const subTotal = Number(subTotalWithSign!.slice(1)); // Remove the dollar sign
    return subTotal;
}