const {By} = require('selenium-webdriver');
require('dotenv').config();

class HomePage {
	constructor(driver){
		this.driver = driver;
	}

	async mainPage(){
		await this.driver.get(process.env.HOMEPAGE_URL);
	}


	async openLoginPage(){
		await this.driver.get(process.env.HOMEPAGE_URL + "login");
	}

    async jobRolePage(){
        await this.driver.get(process.env.HOMEPAGE_URL + "job-roles");
    }

	async logoutLink(){
		return await this.driver.findElement(By.partialLinkText("Log Out"));
	}
}

module.exports = HomePage;