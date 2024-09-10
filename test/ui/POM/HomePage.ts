import { WebDriver, By, WebElement } from 'selenium-webdriver';
import * as dotenv from 'dotenv';

dotenv.config();

class HomePage {
    private driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async mainPage(): Promise<void> {
        await this.driver.get(process.env.HOMEPAGE_URL as string);
    }


    async openLoginPage(): Promise<void> {
        await this.driver.get(`${process.env.HOMEPAGE_URL as string}login`);
    }


    async jobRolePage(): Promise<void> {
        await this.driver.get(`${process.env.HOMEPAGE_URL as string}job-roles`);
    }

    async logoutLink(): Promise<WebElement> {
        return await this.driver.findElement(By.partialLinkText('Log Out'));
    }
}

export default HomePage;
