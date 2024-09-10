import { assert } from 'chai';
import { Builder, By, WebDriver, WebElement } from 'selenium-webdriver';
import HomePage from '../POM/HomePage';
import LoginPage from '../POM/LoginPage';
import * as dotenv from 'dotenv';
dotenv.config();

const email = process.env.LOGIN_EMAIL as string;
const password = process.env.LOGIN_PASSWORD as string;
const adminEmail = process.env.LOGIN_EMAIL_ADMIN as string;
const adminPassword = process.env.LOGIN_PASSWORD_ADMIN as string;

describe('Login Tests', function () {

    let driver: WebDriver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('@login should login with valid login details', async function () {
        this.timeout(100000);

        try {
            console.log("Test - Valid Login");

            const homePage = new HomePage(driver);
            const loginPage = new LoginPage(driver);

            await homePage.mainPage();
            await sleep(2000);
            console.log(await driver.getTitle());

            await homePage.openLoginPage();
            await sleep(2000);
            console.log(await driver.getTitle());

            await loginPage.enterEmail(email);
            await loginPage.enterPassword(password);
            await loginPage.clickLoginButton();
            await sleep(3000);
            console.log(await driver.getTitle());

            const logoutLink: WebElement = await homePage.logoutLink();
            const getLogout: string = await logoutLink.getText();
            assert(getLogout === "Log Out");

        } catch (error) {
            console.log("Error during login: ", error);
            throw error;
        }
    });

    it('@login should fail login with invalid password', async function () {
        this.timeout(100000);

        try {
            console.log("Test - Invalid Password");

            const homePage = new HomePage(driver);
            const loginPage = new LoginPage(driver);

            await homePage.mainPage();
            await sleep(2000);
            console.log(await driver.getTitle());

            await homePage.openLoginPage();
            await sleep(2000);
            console.log(await driver.getTitle());

            await loginPage.enterEmail(email);
            await loginPage.enterPassword('test');
            await loginPage.clickLoginButton();
            await sleep(3000);

            const elm: WebElement = await driver.findElement(By.css('h3'));
            const expected: string = await elm.getText();
            assert(expected === "User is not valid: Invalid credentials");

            console.log("Test Passed (Invalid Password), ", expected);

        } catch (error) {
            console.log("Test Failed");
            console.log("Error during login: ", error);
            throw error;
        }
    });

    it('@login should fail login with invalid email', async function () {
        this.timeout(100000);

        try {
            console.log("Test - Invalid Email");

            const homePage = new HomePage(driver);
            const loginPage = new LoginPage(driver);

            await homePage.mainPage();
            await sleep(2000);
            console.log(await driver.getTitle());

            await homePage.openLoginPage();
            await sleep(2000);
            console.log(await driver.getTitle());

            await loginPage.enterEmail('test@kainos.com');
            await loginPage.enterPassword(password);
            await loginPage.clickLoginButton();
            await sleep(3000);

            const elm: WebElement = await driver.findElement(By.css('h3'));
            const expected: string = await elm.getText();
            assert(expected === "User is not valid: Invalid credentials");

            console.log("Test Passed (Invalid Email), ", expected);

        } catch (error) {
            console.log("Test Failed");
            console.log("Error during login: ", error);
            throw error;
        }
    });

    it('@login should fail login with invalid email format', async function () {
        this.timeout(100000);

        try {
            console.log("Test - Invalid Email format");

            const homePage = new HomePage(driver);
            const loginPage = new LoginPage(driver);

            await homePage.mainPage();
            await sleep(2000);
            console.log(await driver.getTitle());

            await homePage.openLoginPage();
            await sleep(2000);
            console.log(await driver.getTitle());

            await loginPage.enterEmail('userkainos.com');
            await loginPage.enterPassword(password);
            await loginPage.clickLoginButton();
            await sleep(3000);

            const elm: WebElement = await driver.findElement(By.css('h3'));
            const expected: string = await elm.getText();
            assert(expected === "Email is not valid format");

            console.log("Test Passed, ", expected);

        } catch (error) {
            console.log("Test Failed");
            console.log("Error during login: ", error);
            throw error;
        }
    });

    it('@login should login with case-insensitive email', async function () {
        this.timeout(100000);

        try {
            console.log("Test - Case Insensitive email");

            const homePage = new HomePage(driver);
            const loginPage = new LoginPage(driver);

            await homePage.mainPage();
            await sleep(2000);
            console.log(await driver.getTitle());

            await homePage.openLoginPage();
            await sleep(2000);
            console.log(await driver.getTitle());

            const title = await driver.getTitle();
            assert(title === "Log In");

            await loginPage.enterEmail('USER@KAINOS.COM');
            await loginPage.enterPassword(password);
            await loginPage.clickLoginButton();
            await sleep(3000);

            const logoutLink: WebElement = await homePage.logoutLink();
            const getLogout: string = await logoutLink.getText();
            assert(getLogout === "Log Out");

            console.log("Test Passed, Email is case-insensitive");

        } catch (error) {
            console.log("Test Failed");
            console.log("Error during login: ", error);
            throw error;
        }
    });
});

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
