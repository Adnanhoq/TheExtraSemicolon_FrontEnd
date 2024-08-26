# nodejs-express-axios-starter

## How to start the application
1. Run `npm install` to install application dependencies
2. Start the application with `npm start` or `npm run dev` to reload the server when changes are made
3. To check that your application is running enter url http://localhost:3000

## Backend
1. Follow the steps to run the backend for this application <a href="https://github.com/shaunganley/java-dropwizard-flyway-starter" target="_blank">here</a>

## Frontend
docker build --build-arg https://5tmqdqfjni.eu-west-1.awsapprunner.com -t 5tmqdqfjni.eu-west-1.awsapprunner.com/employee_demo:the_extra_semicolon_fe .
docker run -p 3000:3000 5tmqdqfjni.eu-west-1.awsapprunner.com/employee_demo:the_extra_semicolon_fe