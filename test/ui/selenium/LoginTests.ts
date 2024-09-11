import { assert } from 'chai';
import { Builder, By, WebDriver, WebElement } from 'selenium-webdriver';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import { sleep } from '../utils/utils'


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

        const homePage = new HomePage(driver);
        const loginPage = new LoginPage(driver);

        await homePage.mainPage();
        await sleep(2000);

        await homePage.openLoginPage();
        await sleep(2000);

        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();
        await sleep(3000);

        const logoutLink: WebElement = await homePage.logoutLink();
        const getLogout: string = await logoutLink.getText();
        assert(getLogout === "Log Out");

    });

    it('@login should fail login with invalid password', async function () {
        this.timeout(100000);

        const homePage = new HomePage(driver);
        const loginPage = new LoginPage(driver);

        await homePage.mainPage();
        await sleep(2000);

        await homePage.openLoginPage();
        await sleep(2000);

        await loginPage.enterEmail(email);
        await loginPage.enterPassword('test');
        await loginPage.clickLoginButton();
        await sleep(3000);

        const elm: WebElement = await driver.findElement(By.css('h3'));
        const expected: string = await elm.getText();
        assert(expected === "User is not valid: Invalid credentials");

    });

    it('@login should fail login with invalid email', async function () {
        this.timeout(100000);

        const homePage = new HomePage(driver);
        const loginPage = new LoginPage(driver);

        await homePage.mainPage();
        await sleep(2000);

        await homePage.openLoginPage();
        await sleep(2000);

        await loginPage.enterEmail('test@kainos.com');
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();
        await sleep(3000);

        const elm: WebElement = await driver.findElement(By.css('h3'));
        const expected: string = await elm.getText();
        assert(expected === "User is not valid: Invalid credentials");


    });

    it('@login should fail login with invalid email format', async function () {
        this.timeout(100000);

        const homePage = new HomePage(driver);
        const loginPage = new LoginPage(driver);

        await homePage.mainPage();
        await sleep(2000);

        await homePage.openLoginPage();
        await sleep(2000);

        await loginPage.enterEmail('userkainos.com');
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();
        await sleep(3000);

        const elm: WebElement = await driver.findElement(By.css('h3'));
        const expected: string = await elm.getText();
        assert(expected === "Email is not valid format");

    });

    it('@login should login with case-insensitive email', async function () {
        this.timeout(100000);

        const homePage = new HomePage(driver);
        const loginPage = new LoginPage(driver);

        await homePage.mainPage();
        await sleep(2000);

        await homePage.openLoginPage();
        await sleep(2000);

        const title = await driver.getTitle();
        assert(title === "Log In");

        await loginPage.enterEmail('USER@KAINOS.COM');
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();
        await sleep(3000);

        const logoutLink: WebElement = await homePage.logoutLink();
        const getLogout: string = await logoutLink.getText();
        assert(getLogout === "Log Out");

    });
});

