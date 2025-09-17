import { Locator, Page } from "@playwright/test";
import { customer } from "../data/customer-info";


export class CheckoutPage {
    firstNameLocator: Locator;
    lastNameLocator: Locator;
    emailLocator: Locator;
    shippingAddressLocator: Locator;
    cityLocator: Locator;
    countryLocator: Locator;
    zipCodeLocator: Locator;
    nameOnCardLocator: Locator;
    cardNumberLocator: Locator;
    cardExpiryLocator: Locator;
    cardCvcLocator: Locator;
    placeOrderButtonLocator: Locator;

    constructor(page: Page) {
        this.firstNameLocator = page.locator('[data-test-id="checkout-firstname-input"]');
        this.lastNameLocator = page.locator('[data-test-id="checkout-lastname-input"]');
        this.emailLocator = page.locator('[data-test-id="checkout-email-input"]');
        this.shippingAddressLocator = page.locator('[data-test-id="checkout-address-input"]');
        this.cityLocator = page.locator('[data-test-id="checkout-city-input"]');
        this.countryLocator = page.locator('[data-test-id="checkout-country-input"]');
        this.zipCodeLocator = page.locator('[data-test-id="checkout-zipcode-input"]');
        this.nameOnCardLocator = page.locator('[data-test-id="checkout-cardname-input"]');
        this.cardNumberLocator = page.locator('[data-test-id="checkout-cardnumber-input"]');
        this.cardExpiryLocator = page.locator('[data-test-id="checkout-cardexpiry-input"]');
        this.cardCvcLocator = page.locator('[data-test-id="checkout-cardcvc-input"]');
        this.placeOrderButtonLocator = page.locator('[data-test-id="place-order-button"]');
    }

    async fillContactInfo() {
        await this.firstNameLocator.fill(customer.contact.firstName);
        await this.lastNameLocator.fill(customer.contact.lastName);
        await this.emailLocator.fill(customer.contact.email);
    }

async fillShippingAddress() {
        await this.shippingAddressLocator.fill(customer.shipping.address);
        await this.cityLocator.fill(customer.shipping.city);
        await this.countryLocator.fill(customer.shipping.country);
        await this.zipCodeLocator.fill(customer.shipping.zipCode);
    }

    async fillPaymentInfo() {
        await this.nameOnCardLocator.fill(customer.payment.nameOnCard);
        await this.cardNumberLocator.fill(customer.payment.cardNumber);
        await this.cardExpiryLocator.fill(customer.payment.expiry);
        await this.cardCvcLocator.fill(customer.payment.cvc);
    }

    async placeOrder() {
        await this.placeOrderButtonLocator.click();
    }
}

