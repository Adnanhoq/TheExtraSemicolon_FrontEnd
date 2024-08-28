# nodejs-express-axios-starter

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


<!-- ## Run the frontend application in Docker [THIS HAS NOT BEEN RESOLVED YET - DO NOT RUN]
1. Run the follow commands to run the docker for the front end
`docker build --build-arg https://5tmqdqfjni.eu-west-1.awsapprunner.com -t 5tmqdqfjni.eu-west-1.awsapprunner.com/employee_demo:the_extra_semicolon_fe .`
`docker run -p 3000:3000 5tmqdqfjni.eu-west-1.awsapprunner.com/employee_demo:the_extra_semicolon_fe`
2. The commands above will the build the application and then run it. Check the application here: <a href="https://5tmqdqfjni.eu-west-1.awsapprunner.com" target="_blank">here</a> -->

## Run Tests
1. To run the following tests, run `npm test`.
    1. Unit testing
    2. Mock testing
2. To run the ui tests, run `npm run test-ui`
3. To run the accessibility tests, run `pa11y-ci`
These tests should all pass

## Link to the AWS 
To see the frontend on cloud, go to: https://fqq3vg4qpt.eu-west-1.awsapprunner.com