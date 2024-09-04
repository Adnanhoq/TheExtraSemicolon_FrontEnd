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
2. To run the ui tests, run `npm run test-ui`
3. To run the accessibility tests, run `pa11y-ci`
These tests should all pass

## Run Performance Testing for Job Roles Page (Ensure backend and frontend are both running)
1. Download and install JMeter at this link [text](https://jmeter.apache.org/download_jmeter.cgi)
2. Click and drag the .jmx files in the performanceTesting file to your machine.
3. In the terminal, run 'jmeter', this should open the Jmeter GUI
4. Navigate to File -> Open, then locate the .jmx files
5. If testing locally, open jobListPerformanceTest_LocalHost; If testing on AWS, open jobListPerformanceTest_AWS.
6. Click the first green play button, this should run all threads sequentially. For each of the .jmx files, this will take around 10 minutes
7. After tests have run, expand each of the threads in the left hand menu and view Results Tree to confirm all have run successfully (A green shield should be visible)
8. Open the excel file found in performanceTesting.
9. On both 'Summary Report' and 'Aggregate Report' in JMeter, either:
    a) click 'Save Table Data' to save a .csv file, and copy and paste the relevant data into the excel spreadsheet. (Be sure not to copy the totals row and to paste values only)
    b) Manually enter the data into the excel spreadsheet
10. Review your results.

## Link to the AWS 
To see the frontend on cloud, go to: https://fqq3vg4qpt.eu-west-1.awsapprunner.com

## User Credentials

| Email | Password | Role |
| ----- | -------- | ---- |
| admin@kainos.com | admin | admin |
| user@kainos.com | user | user