# The Extra Semicolon FrontEnd Application Set Up

## Copy env
1. Copy '.env.example' 
2. Rename the file to .env

## How to start the application
1. Run `npm install` to install application dependencies
2. Start the application with `npm start` or `npm run dev` to reload the server when changes are made
3. To check that your application is running locally enter url http://localhost:3000

## Run Linter in your VSCode application
1. `npm run linter`

## Backend
1. Follow the steps to run the backend for this application <a href="https://github.com/sdagn1/TheExtraSemicolon_BackEnd" target="_blank">here</a>
2. You will need this backend running in order to access the APIs from the frontend
4. Go to http://localhost:3000/test to check if the application has connected to the backend


## Run the frontend application in Docker [THIS HAS NOT BEEN RESOLVED YET - DO NOT RUN]
1. Run the follow commands to run the docker for the front end
`docker build --build-arg https://5tmqdqfjni.eu-west-1.awsapprunner.com -t 5tmqdqfjni.eu-west-1.awsapprunner.com/employee_demo:the_extra_semicolon_fe .`
`docker run -p 3000:3000 5tmqdqfjni.eu-west-1.awsapprunner.com/employee_demo:the_extra_semicolon_fe`
2. The commands above will the build the application and then run it. Check the application here: <a href="https://5tmqdqfjni.eu-west-1.awsapprunner.com" target="_blank">here</a>

## Run Tests
1. To run the following tests, run `npm test`.
    1. Unit testing
    2. Mock testing
2. To run the ui tests:
    - Copy '.env.example' 
    - Rename the file to .env
    - Login tests, run -  `npm run test-ui:login`
    - View Job Roles tests, run -  `npm run test-ui:roles`
    - To run local - change 'process.env.HOMEPAGE_URL' to 'process.env.HOMEPAGE_URL_LOCAL' for all lines in the file.
    - Then run the commands above (make sure local is running back and frontend)

3. To run the accessibility tests, run `pa11y-ci`
These tests should all pass

## Run Performance Testing for Job Roles Page (Ensure backend and frontend are both running)
1. Download and install JMeter at this link [text](https://jmeter.apache.org/download_jmeter.cgi)
2. Click and drag all files in the performanceTesting file in the project directory to your desktop.
3. Open JMeter, navigate to File -> Open, then open the LocalTest.jmx file.
4. Run the test by clicking the green play button at the top of the page.
5. Click save table data on both 'Summary Report' and 'Aggregate Report', and name the files appropriately.
6. Open the Excel spreadsheet that was part of the performanceTesting file, and open the 'Summary Report' file you saved in step 5. 
7. Remove all rows that do not say 'log in and navigate'.
8. Remove the last 3 columns. 
9. Copy and Paste remaining information into the relevant boxes in the table on the right of the Excel file.
10. Open the 'Aggregate Report' and repeat step 8 here.
11. Copy and Paste '95% Line' and '99% Line'into the relevant boxes in the table on the right of the Excel file.
12. The cells in the table should go red or green depending on how they compare to the performance test baseline.

## Link to the AWS 
To see the frontend on cloud, go to: https://fqq3vg4qpt.eu-west-1.awsapprunner.com

## User Credentials

| Email | Password | Role |
| ----- | -------- | ---- |
| admin@kainos.com | admin | admin |
| user@kainos.com | user | user