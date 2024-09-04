const { resolve } = require("path");
const HomePage = require("../../../../src/POM/HomePage");

async function ViewJobRoles() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {

        const homepage = new HomePage(driver);

        await homepage.mainPage();
        await sleep(2000);
    
    } catch (error){
        console.log('error: ', error);
    } finally {
        await driver.quit()
    }
    
}

function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }