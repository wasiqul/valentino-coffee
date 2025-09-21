import { Locator, Page } from "@playwright/test";
import * as user from "../data/user-info"

export class LogInPage {
    emailLocator: Locator;
    passwordLocator: Locator;
    logInButtonLocator: Locator;

    constructor(page: Page){
        this.emailLocator = page.locator('[data-test-id="login-email-input"]');
        this.passwordLocator = page.locator('[data-test-id="login-password-input"]');
        this.logInButtonLocator = page.locator('[data-test-id="login-submit-button"]');
    }

    async fillCredentials(userEmail: string){
        await this.emailLocator.fill(userEmail);
        await this.passwordLocator.fill(user.user.password);
    }

    async logInWithCredentials(){
        await this.logInButtonLocator.click();
    }
}