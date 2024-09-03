const {Builder, By} = require('selenium-webdriver');

async function example() {

    let driver = await new Builder().forBrowser('chrome').build();

    try {

        await driver.get('http://localhost:3000');
        console.log(await driver.getTitle());
        await sleep(2000);
        await driver.get('http://localhost:3000/login');
        console.log(await driver.getTitle());
        await sleep(2000);
        await driver.findElement(By.xpath("//*[@id='email']")).sendKeys("admin@kainos.com");
        await driver.findElement(By.xpath("//*[@id='password']")).sendKeys("admin");
        await driver.findElement(By.xpath("//*[@id='login']")).click;
        console.log(await driver.getTitle());
        await sleep(8000);

        await driver

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

