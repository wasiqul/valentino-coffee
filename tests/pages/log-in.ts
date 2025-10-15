import { expect, Locator, Page } from "@playwright/test";

export class LogInPage {
    emailLocator: Locator;
    passwordLocator: Locator;
    logInButtonLocator: Locator;

    constructor(page: Page){
        this.emailLocator = page.locator('[data-test-id="login-email-input"]');
        this.passwordLocator = page.locator('[data-test-id="login-password-input"]');
        this.logInButtonLocator = page.locator('[data-test-id="login-submit-button"]');
    }

    async fillCredentials(userEmail: string, userPassword: string){
        await this.emailLocator.fill(userEmail);
        await this.passwordLocator.fill(userPassword);
    }

    async logInWithCredentials(){
        await this.logInButtonLocator.click();

    }

    async logInSuccess(page: Page){
        await expect(page).toHaveURL('/');
    }
}