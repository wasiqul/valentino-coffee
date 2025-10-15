import { test } from "@playwright/test";
import path from 'path';
import fs from 'fs';
import * as logInPage from "../pages/log-in";

// Resolve the directory inorder to read from file
const authDirRead = path.resolve(__dirname, '../../playwright/.auth/loginCreds.json');
    
// Read crdentials from the file
const userCredentialRead = JSON.parse(fs.readFileSync(authDirRead, 'utf-8')) as {
    userEmailAddress: string;
    userPassword: string;
}

// Write browser context storage in a file
const authStorageDir = path.resolve(__dirname, '../../playwright/.auth/user.json');

test('Login test', async ({page}) => {

    await page.goto('/login');

    // Log in with user data from file
    const myLogInPage = new logInPage.LogInPage(page);

    await myLogInPage.fillCredentials(userCredentialRead.userEmailAddress, userCredentialRead.userPassword);
    await myLogInPage.logInWithCredentials();
    await myLogInPage.logInSuccess(page);

    await page.context().storageState({
        path: authStorageDir
    });

})