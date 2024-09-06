const {By} = require('selenium-webdriver');

class HomePage {
	constructor(driver){
		this.driver = driver;
	}

	async mainPage(){
		await this.driver.get('https://fqq3vg4qpt.eu-west-1.awsapprunner.com/');
		//this.driver.get('http://localhost:3000/');

	}


	async openLoginPage(){
		await this.driver.get('https://fqq3vg4qpt.eu-west-1.awsapprunner.com/login');
		//this.driver.get('http://localhost:3000/login');

	}

    async jobRolePage(){
        await this.driver.get('https://fqq3vg4qpt.eu-west-1.awsapprunner.com/job-roles');
        //this.driver.get('http://localhost:3000/job-roles');

    }

	async logoutLink(){
		return await this.driver.findElement(By.partialLinkText("Log Out"));
	}
}

module.exports = HomePage;