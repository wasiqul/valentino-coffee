import { Page } from "@playwright/test";

export async function getOrderId(page: Page) {
    const orderWrapper = await page.getByText('Your Order ID is:').locator('..');
    const orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent();
    return orderId;
}

export async function goToTrackOrder(page: Page) {
    await page.getByRole('button', { name: 'Track Your Order' }).click();
}