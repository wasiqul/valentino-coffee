import { expect, test } from '@playwright/test';
import { emailUtils } from './utils/email-utils';
import { user } from './data/user-info.ts';
import * as signUpPage from './pages/sign-up';
import * as signUpConfirmPage from './pages/sign-up-confirm';
import * as logInPage from './pages/log-in';
import { join, resolve } from 'path';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';

const createEmailFlag = process.env.EMAIL_FLAG;

test('Mailslurp inbox test', async ({page}) => {

    test.skip( createEmailFlag !== 'true', 'Skipping email creation')

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


    // Get user credentials in an object in order to write it down in a file
    const userCredentialWrite = {
        userEmailAddress: myEmailAddress,
        userPassword: user.password
    }

    // Resolve the directory inorder to write on file
    const authDirWrite = resolve(__dirname, '../playwright/.auth');

    // Writing user credential in the file
    writeFileSync(
        join(authDirWrite, 'loginCreds.json'),
        JSON.stringify(userCredentialWrite,null, 2)
    );

    // Log in with newly created user
    const myLogInPage = new logInPage.LogInPage(page);
    await myLogInPage.fillCredentials(userCredentialWrite.userEmailAddress, userCredentialWrite.userPassword);
    await myLogInPage.logInWithCredentials();
    await myLogInPage.logInSuccess(page);
})

test('Loggedin test', async ({page}) => {
    // Go to homepage
    await page.goto('/');

    // Click on user icon
    await page.locator('div').filter({ hasText: /^Toggle navigation menu$/ }).locator('div').getByRole('button').click();

    // Get the welcome text
    const welcomeText = page.getByText('Welcome!');

    // Verify that user logged in and welcome text shown
    await expect(welcomeText).toBeVisible();
})