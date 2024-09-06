const {Builder, By} = require('selenium-webdriver');

class LoginPage{
    constructor(driver){
        this.driver = driver;
        this.emailInput = By.xpath("//*[@id='email']");
        this.passwordInput = By.xpath("//*[@id='password']");
        this.loginButton = By.xpath("//*[@id='login']");
        this.errorMessage = By.xpath("/html/body/div/div/h3");
    }

    async enterEmail(email){
        await this.driver.findElement(this.emailInput).sendKeys(email);
    }
    
    async enterPassword(password){
        await this.driver.findElement(this.passwordInput).sendKeys(password);
    }

    async clickLoginButton(){
        await this.driver.findElement(this.loginButton).click();
    }

    async getErrorMessage() {
        let element = await this.driver.findElement(this.errorMessage);
        return await element.getText();
    }
}

module.exports = LoginPage;