const {By} = require('selenium-webdriver');
require('dotenv').config();

class HomePage {
	constructor(driver){
		this.driver = driver;
	}

	async mainPage(){
		await this.driver.get(process.env.HOMEPAGE_URL_LOCAL);
	}


	async openLoginPage(){
		await this.driver.get(process.env.LOGIN_PAGE_URL_LOCAL);
	}

    async jobRolePage(){
        await this.driver.get(process.env.JOB_ROLE_PAGE_URL_LOCAL);
    }

	async logoutLink(){
		return await this.driver.findElement(By.partialLinkText("Log Out"));
	}
}

module.exports = HomePage;