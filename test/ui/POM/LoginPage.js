const {By} = require('selenium-webdriver');

class LoginPage{
    constructor(driver){
        this.driver = driver;
        this.emailInput = By.id('email');
        this.passwordInput = By.id('password');
        this.loginButton = By.id('login');
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
}

module.exports = LoginPage;