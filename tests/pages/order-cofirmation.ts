import { Locator, Page } from "@playwright/test";

export class OrderConfirmationPage {
    orderWrapperLocator: Locator;
    orderIdLocator: Locator;
    trackOrderButtonLocator: Locator;
    
    constructor(page: Page) {
        this.orderWrapperLocator = page.getByText('Your Order ID is:').locator('..');
        this.orderIdLocator = this.orderWrapperLocator.getByRole('paragraph').nth(1);
        this.trackOrderButtonLocator = page.getByRole('button', { name: 'Track Your Order' });
    }

    async getOrderId() {
        return this.orderIdLocator.textContent();
    }

    async goToTrackOrder() {
        await this.trackOrderButtonLocator.click();
    }
}

