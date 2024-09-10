import { WebDriver, By, WebElement } from 'selenium-webdriver';

class LoginPage {
    private driver: WebDriver;
    private emailInput: By;
    private passwordInput: By;
    private loginButton: By;

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.emailInput = By.id('email');
        this.passwordInput = By.id('password');
        this.loginButton = By.id('login');
    }

    async enterEmail(email: string): Promise<void> {
        const emailElement: WebElement = await this.driver.findElement(this.emailInput);
        await emailElement.sendKeys(email);
    }

    async enterPassword(password: string): Promise<void> {
        const passwordElement: WebElement = await this.driver.findElement(this.passwordInput);
        await passwordElement.sendKeys(password);
    }

    async clickLoginButton(): Promise<void> {
        const loginButtonElement: WebElement = await this.driver.findElement(this.loginButton);
        await loginButtonElement.click();
    }
}

export default LoginPage;
