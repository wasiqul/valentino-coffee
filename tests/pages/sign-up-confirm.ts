import { Locator, Page } from "@playwright/test";

export class SignUpConfirmPage{
    confirmationCodeLocator: Locator;
    confirmAccountButton: Locator;

    constructor(page: Page){
        this.confirmationCodeLocator = page.getByRole("textbox");
        this.confirmAccountButton = page.locator('[data-test-id="confirm-signup-submit-button"]');
    }

    async fillConfirmationCode(confirmationCode: string){
        await this.confirmationCodeLocator.fill(confirmationCode);
    }

    async confirmAccount(){
        await this.confirmAccountButton.click()
    }
}