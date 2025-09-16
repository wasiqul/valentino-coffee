import { Page } from "@playwright/test";

export async function getOrderDetails(page: Page) {
    const orderDetailsWrapper = page.locator('.p-6');
    const orderItem = await orderDetailsWrapper.getByRole('paragraph').nth(1).textContent();
    const customerName = await orderDetailsWrapper.getByRole('paragraph').nth(4).textContent();
    return { orderItem, customerName };
}