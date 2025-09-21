import { Locator, Page } from "@playwright/test"
import { user } from "../data/user-info.ts";

export class SignUpPage {
    firstNameLocator: Locator;
    lastNameLocator: Locator;
    emailAddressLocator: Locator;
    passwordLocator: Locator;
    createAccountButtonLocator: Locator;

    constructor(page: Page){
        this.firstNameLocator = page.locator('[data-test-id="signup-firstname-input"]');
        this.lastNameLocator = page.locator('[data-test-id="signup-lastname-input"]');
        this.emailAddressLocator = page.locator('[data-test-id="signup-email-input"]');
        this.passwordLocator = page.locator('[data-test-id="signup-password-input"]');
        this.createAccountButtonLocator = page.locator('[data-test-id="signup-submit-button"]')
    }

    async fillUserInfo(emailAddress: string) {
        await this.firstNameLocator.fill(user.firstName);
        await this.lastNameLocator.fill(user.lastName);
        await this.emailAddressLocator.fill(emailAddress);
        await this.passwordLocator.fill(user.password);
    }

    async createAccount() {
        await this.createAccountButtonLocator.click();
    }
}