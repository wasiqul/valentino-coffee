import { Locator, Page } from "@playwright/test";

export class OrderDetailsPage {
    orderDetailsWrapper: Locator;
    orderItemLocator: Locator;
    customerNameLocator: Locator;

    constructor(page: Page) {
        this.orderDetailsWrapper = page.locator('.p-6');
        this.orderItemLocator = this.orderDetailsWrapper.getByRole('paragraph').nth(1);
        this.customerNameLocator = this.orderDetailsWrapper.getByRole('paragraph').nth(4);
    }

    async getOrderDetails() {
        const orderItem = await this.orderItemLocator.textContent();
        const customerName = await this.customerNameLocator.textContent();
        return { orderItem, customerName };
    }
}

