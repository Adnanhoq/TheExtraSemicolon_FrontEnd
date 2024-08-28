import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { getAllDatabases } from "./controllers/TestController";
import { getSingleJobRole } from "./controllers/JobRoleController";
import { getAllJobRoles } from "./controllers/JobRoleController";
import { dateFilter } from "./filters/DateFilter";

const app = express();

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

env.addFilter('date', dateFilter);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Specifing folder from where to serve static files (gets rid of MIME type CSS issue)
app.use(express.static("views"));
// Specifying folder from where to fetch images
app.use('/assets', express.static('./assets')); 

app.use('/css', express.static('views/css'));

app.use(session({ secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 }}));

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  res.render('index.njk');
});
app.get('/job-roles/:id', getSingleJobRole);

app.get('/test', getAllDatabases);
app.get('/jobRoles', getAllJobRoles);