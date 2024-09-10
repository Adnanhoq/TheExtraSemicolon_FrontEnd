const { resolve } = require("path");
const { Builder, By } = require('selenium-webdriver');
const HomePage = require("../POM/HomePage");
const LoginPage = require('../POM/LoginPage');
const { get } = require("http");
const { assert } = require("console");
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

describe('View Job Roles Tests', function() {

    let driver;
    
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        if (driver){
            await driver.quit();
        }
    });

    it('@roles should view job roles page', async function(){
        
        this.timeout(100000);
        
        try {

            console.log('Test - View Job role Page')
    
            const homepage = new HomePage(driver);
            const loginPage = new LoginPage(driver);
    
    
            await homepage.mainPage();
            await sleep(2000);
            console.log(await driver.getCurrentUrl());
            console.log(await driver.getTitle());
    
            await homepage.openLoginPage();
            await sleep(2000);
            console.log(await driver.getTitle());
    
            await loginPage.enterEmail(email);
            await loginPage.enterPassword(password);
            await loginPage.clickLoginButton();
            await sleep(3000);
            console.log(await driver.getTitle());
    
            await homepage.jobRolePage();
            await sleep(3000);
            console.log(await driver.getTitle());
    
            let job_roles = await await driver.getTitle();
            let expected_job_role = "Job Roles"
            assert(expected_job_role == job_roles);
    
            console.log('Test Passed: ', await driver.getTitle());
    
        } catch (error){
            console.log('error: ', error);
        }

    })

    it('@roles should check for a role on the job roles page', async function(){

        this.timeout(100000);

        try {

            const homepage = new HomePage(driver);
            const loginPage = new LoginPage(driver);
    
            await homepage.mainPage();
            await sleep(2000);
            console.log(await driver.getCurrentUrl());
            console.log(await driver.getTitle());
    
            await homepage.openLoginPage();
            await sleep(2000);
            console.log(await driver.getTitle());
    
            await loginPage.enterEmail(email);
            await loginPage.enterPassword(password);
            await loginPage.clickLoginButton();
            await sleep(3000);
            console.log(await driver.getTitle());
    
            await homepage.jobRolePage();
            await sleep(2000);
            console.log(await driver.getCurrentUrl());
            console.log(await driver.getTitle());
    
            let role = await driver.findElement(By.css('h5'));
            let role_title = await role.getText();
    
            assert(role_title == 'Technology Leader');
    
            await sleep(4000);
            console.log(role_title);
            console.log('Test passed, Role is present');
    
        } catch (error){
            console.log('error: ', error);
        }
    })
});


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};