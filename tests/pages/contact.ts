import { Page } from "@playwright/test";
import * as checkoutInfo from './checkout';

export async function trackOrder(page: Page, contactOrderId: string) {
    await page.locator('[data-test-id="contact-order-id-input"]').fill(contactOrderId);
    await page.locator('[data-test-id="contact-email-input"]').fill(checkoutInfo.customer.contact.email);
    await page.getByRole('button', { name: 'Track Order' }).click();
    await page.waitForTimeout(2000); // wait for 2 seconds to load the order details
}