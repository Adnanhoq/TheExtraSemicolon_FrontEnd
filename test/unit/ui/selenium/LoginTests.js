const { Assertion } = require('chai');
const { assert } = require('chai');
const {Builder, By} = require('selenium-webdriver');
const HomePage = require('../../../../src/POM/HomePage');
const LoginPage = require('../../../../src/POM/LoginPage');
const readline = require('readline');
const email = process.env.LOGIN_EMAIL;
const password = process.env.LOGIN_PASSWORD;
const adminEmail = process.env.LOGIN_EMAIL_ADMIN;
const adminPassword = process.env.LOGIN_PASSWORD_ADMIN;
require('dotenv').config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function ValidLogin() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        
        console.log("Test - Valid Login")

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

        let logout_link = await homePage.logoutLink();
        let getLogout = await logout_link.getText();
        assert(getLogout == "Log Out");

        console.log('Test Passed: Log out Link present')

    } catch (error) {
        console.log("error during login: ", error);
    } finally{
        await driver.quit();
    } 
}

async function InvalidPassword() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        console.log("Test - Invalid Login")

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
        console.log(await driver.getTitle());

        let elm = await driver.findElement(By.xpath("/html/body/div/div/h3"))
        let expected = await elm.getText();

        assert(expected == "User is not valid: Invalid credentials");
        
        await sleep(2500);
        
        console.log("Test Passed (Invalid Password), ", expected);
        

    } catch (error) {
        console.log("Test Failed");
        console.log("error during login: ", error);
    } finally{
        await driver.quit();
    }
}

async function InvalidEmail() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        console.log("Test - Invalid Email")


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
        console.log(await driver.getTitle());

        let elm = await driver.findElement(By.xpath("/html/body/div/div/h3"))
        let expected = await elm.getText();

        assert(expected == "User is not valid: Invalid credentials");
        
        await sleep(2500);
        
        console.log("Test Passed (Invalid Email), ", expected);
        

    } catch (error) {
        console.log("Test Failed");
        console.log("error during login: ", error);
    } finally{
        await driver.quit();
    }
}

async function InvalidEmailFormat() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        console.log("Test - Invalid Email format")


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
        console.log(await driver.getTitle());


        let elm = await driver.findElement(By.xpath("/html/body/div/div/h3"))
        let expected = await elm.getText();

        assert(expected == "Email is not valid format");
        
        await sleep(5000);
        
        console.log("Test Passed, ", expected);
        

    } catch (error) {
        console.log("Test Failed");
        console.log("error during login: ", error);
    } finally{
        await driver.quit();
    }
}

async function case_insensitive_email() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        console.log("Test - Case Insensitive email")


        const homePage = new HomePage(driver);
        const loginPage = new LoginPage(driver);


        await homePage.mainPage();
        await sleep(2000);
        console.log(await driver.getTitle());

        await homePage.openLoginPage();
        await sleep(2000);
        console.log(await driver.getTitle());

        let title = await driver.getTitle();
        assert(title == "Log In");

        await loginPage.enterEmail('USER@KAINOS.COM');
        await loginPage.enterPassword(password);
        await loginPage.clickLoginButton();
        await sleep(3000);
        console.log(await driver.getTitle());


        let logout_link = await homePage.logoutLink();
        let getLogout = await logout_link.getText();
        assert(getLogout == "Log Out");

        console.log('Log out Link present')
        
        await sleep(5000);
        
        console.log("Test Passed, Email is case-insensitive");
        

    } catch (error) {
        console.log("Test Failed");
        console.log("error during login: ", error);
    } finally{
        await driver.quit();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


console.log('Choose a test to run:');
console.log('1. Valid Login');
console.log('2. Invalid Password');
console.log('3. Invalid Email');
console.log('3. Invalid Email format');
console.log('3. Case Insensitive Email');


rl.question('Enter the test number: ', (answer) => {
    switch (answer) {
        case '1':
            ValidLogin();
            break;
        case '2':
            InvalidPassword();
            break;
        case '3':
            InvalidEmail();
            break;
        default:
            console.log('Invalid selection');
    }
    rl.close();
});
