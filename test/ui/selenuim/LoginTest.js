const {Builder} = require('selenium-webdriver');

async function example() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:3000');
        //console.log(await driver.getTitle());
        await sleep(2000);
    } catch (error) {
        console.log("error during login: ", error);
    } finally{
        await driver.quit();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

example();

