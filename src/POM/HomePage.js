const {Builder, By} = require('selenium-webdriver');

class HomePage {
    constructor(driver){
        this.driver = driver;
        this.logout = By.partialLinkText("Log Out");
    }

    async mainPage(){
        //this.driver.get('https://fqq3vg4qpt.eu-west-1.awsapprunner.com/')
        this.driver.get('http://localhost:3000/')

    }


    async openLoginPage(){
        //this.driver.get('https://fqq3vg4qpt.eu-west-1.awsapprunner.com/login')
        this.driver.get('http://localhost:3000/login')

    }
    
    async logoutLink(){
        return await this.driver.findElement(this.logout);
    }
}

module.exports = HomePage;