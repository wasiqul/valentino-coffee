import { expect, Locator, Page } from "@playwright/test";

export class MyOrdersPage {
    myOrderIdLocator: Locator;

  constructor(private page: Page) {
    this.myOrderIdLocator = page.getByRole('heading', { name: 'Order #' }).nth(0);
  }

  async verifyMyOrder(myOrderID: string) {

    // Get the order ID with sign
    const myOrderIdWithSign = await this.myOrderIdLocator.textContent();

    // Remove the 'Order #' text
    const orderId = myOrderIdWithSign?.slice(-8);

    // Compare the order IDs
    expect(orderId).toEqual(myOrderID);
  }
}
