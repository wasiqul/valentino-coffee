import { Locator, Page } from "@playwright/test";
import * as checkoutInfo from '../data/customer-info';
import { user } from "../data/user-info";

export class ContactPage {
    contactOrderIdInputLocator: Locator;
    contactEmailInputLocator: Locator;
    trackOrderButtonLocator: Locator;

    constructor(page: Page) {
        this.contactOrderIdInputLocator = page.locator('[data-test-id="contact-order-id-input"]');
        this.contactEmailInputLocator = page.locator('[data-test-id="contact-email-input"]');
        this.trackOrderButtonLocator = page.getByRole('button', { name: 'Track Order' });
    }

    async trackOrder(contactOrderId: string) {
        await this.contactOrderIdInputLocator.fill(contactOrderId);
        await this.contactEmailInputLocator.fill(checkoutInfo.customer.contact.email);
        await this.trackOrderButtonLocator.click();
    }
}

