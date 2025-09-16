import { Page } from "@playwright/test";

export const customer = {
    contact:{
        firstName: 'Wasiqul',
        lastName: 'Huq',
        email: 'wasiqul@gml.com'
    },
    shipping:{
        address: 'Dhaka, Bangladesh',
        city: 'Dhaka',
        country: 'Bangladesh',
        zipCode: '12078'
    },
    payment: {
        nameOnCard: 'Wasiqul Huq',
        cardNumber: '4242 4242 4242 4242',
        expiry: '10/30',
        cvc: '123'
    }
}

export async function fillContactInfo(page: Page) {
    await page.locator('[data-test-id="checkout-firstname-input"]').fill(customer.contact.firstName);
    await page.locator('[data-test-id="checkout-lastname-input"]').fill(customer.contact.lastName);
    await page.locator('[data-test-id="checkout-email-input"]').fill(customer.contact.email);
    await page.waitForTimeout(1000); // pause before filling the next section
}

export async function fillShippingAddress(page: Page) {
    await page.locator('[data-test-id="checkout-address-input"]').fill(customer.shipping.address);
    await page.locator('[data-test-id="checkout-city-input"]').fill(customer.shipping.city);
    await page.locator('[data-test-id="checkout-country-input"]').fill(customer.shipping.country);
    await page.locator('[data-test-id="checkout-zipcode-input"]').fill(customer.shipping.zipCode);
    await page.waitForTimeout(1000); // pause before filling the next section
}

export async function fillPaymentInfo(page: Page) {
    await page.locator('[data-test-id="checkout-cardname-input"]').fill(customer.payment.nameOnCard);
    await page.locator('[data-test-id="checkout-cardnumber-input"]').fill(customer.payment.cardNumber);
    await page.locator('[data-test-id="checkout-cardexpiry-input"]').fill(customer.payment.expiry);
    await page.locator('[data-test-id="checkout-cardcvc-input"]').fill(customer.payment.cvc);
    await page.waitForTimeout(1000); // pause before clicking the place order button
}

export async function placeOrder(page: Page) {
    await page.getByRole('button', { name: 'Place Order' }).click();
}