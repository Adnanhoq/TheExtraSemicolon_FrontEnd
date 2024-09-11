import { WebDriver, By, WebElement } from 'selenium-webdriver';

class HomePage {
    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async mainPage(): Promise<void> {
        await this.driver.get(process.env.HOMEPAGE_URL_LOCAL as string);
    }


    async openLoginPage(): Promise<void> {
        await this.driver.get(`${process.env.HOMEPAGE_URL_LOCAL as string}login`);
    }


    async jobRolePage(): Promise<void> {
        await this.driver.get(`${process.env.HOMEPAGE_URL_LOCAL as string}job-roles`);
    }

    async logoutLink(): Promise<WebElement> {
        return await this.driver.findElement(By.partialLinkText('Log Out'));
    }
}

export default HomePage;
