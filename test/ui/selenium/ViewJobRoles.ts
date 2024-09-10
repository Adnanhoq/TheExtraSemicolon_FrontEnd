import { assert } from 'chai';
import { Builder, By, WebDriver } from 'selenium-webdriver';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';


const email = process.env.LOGIN_EMAIL as string;
const password = process.env.LOGIN_PASSWORD as string;

describe('View Job Roles Tests', function () {
    let driver: WebDriver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('@roles should view job roles page', async function () {
        this.timeout(100000);

        const homepage = new HomePage(driver);
        const loginPage = new LoginPage(driver);

        await homepage.mainPage();
        await sleep(2000);

        await homepage.openLoginPage();
        await sleep(2000);

        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();
        await sleep(3000);

        await homepage.jobRolePage();
        await sleep(3000);

        const jobRolesTitle = await driver.getTitle();
        const expectedJobRole = "Job Roles";
        assert(expectedJobRole === jobRolesTitle);

});

    it('@roles should check for a role on the job roles page', async function () {
        this.timeout(100000);

        const homepage = new HomePage(driver);
        const loginPage = new LoginPage(driver);

        await homepage.mainPage();
        await sleep(2000);

        await homepage.openLoginPage();
        await sleep(2000);

        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();
        await sleep(3000);

        await homepage.jobRolePage();
        await sleep(2000);

        const role = await driver.findElement(By.css('h5'));
        const roleTitle = await role.getText();

        assert(roleTitle === 'Technology Leader');

        await sleep(4000);

    });
});

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
