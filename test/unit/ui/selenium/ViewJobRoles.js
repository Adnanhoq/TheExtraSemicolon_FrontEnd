const { resolve } = require("path");
const { Builder } = require('selenium-webdriver');
const HomePage = require("../../../../src/POM/HomePage");
const { get } = require("http");
const { assert } = require("console");

async function ViewJobRoles() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {

        const homepage = new HomePage(driver);

        await homepage.mainPage();
        await sleep(2000);
        console.log(await driver.getCurrentUrl());
        console.log(await driver.getTitle());

        await homepage.jobRolePage();
        await sleep(2000);
        console.log(await driver.getTitle());

    } catch (error){
        console.log('error: ', error);
    } finally {
        await driver.quit()
    }
    
}

async function CheckForRoles() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {

        const homepage = new HomePage(driver);

        await homepage.mainPage();
        await sleep(2000);
        console.log(await driver.getCurrentUrl());
        console.log(await driver.getTitle());

        await homepage.jobRolePage();
        await sleep(2000);
        console.log(await driver.getTitle());

        let role = await this.driver.findElement(By.xpath('/html/body/div/div/h1'));
        let role_text = await role.getText();

        assert(role_text == 'Job Roles List');

        console.log(role_text);

    } catch (error){
        console.log('error: ', error);
    } finally {
        await driver.quit()
    }
    
}    




function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }



//ViewJobRoles();
CheckForRoles();