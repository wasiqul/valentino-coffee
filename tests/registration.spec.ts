import {test, expect} from '@playwright/test';
import { emailUtils } from './utils/email-utils';
import * as signUpPage from './pages/sign-up';
import * as signUpConfirmPage from './pages/sign-up-confirm';
import * as logInPage from './pages/log-in';


test ('Mailslurp inbox test', async ({page}) => {
    // Create the email and get the email address
    const mailSlurpEmailUtil = new emailUtils;
    const myInbox = await mailSlurpEmailUtil.createInbox();
    const myEmailAddress = myInbox.emailAddress;


    // Go to sign up page and fill up user information
    await page.goto('/signup');
    const mySignUpPage = new signUpPage.SignUpPage(page);
    await mySignUpPage.fillUserInfo(myEmailAddress);
    await mySignUpPage.createAccount();


    // Get the latest email with verification code
    const newEmail = await mailSlurpEmailUtil.waitForEmail(myInbox.id);
    const emailBody: string = newEmail.body!;
    const verificationCode: string = emailBody.slice(-6);

    
    // Enter the verification code in sign up confirmation page
    const mySignUpConfirmPage = new signUpConfirmPage.SignUpConfirmPage(page);
    await mySignUpConfirmPage.fillConfirmationCode(verificationCode);
    await mySignUpConfirmPage.confirmAccount();


    // Log in with newly created user
    const myLogInPage = new logInPage.LogInPage(page);
    await myLogInPage.fillCredentials(myEmailAddress);
    await myLogInPage.logInWithCredentials();
})
