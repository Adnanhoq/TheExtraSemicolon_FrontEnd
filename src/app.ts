import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import multer from "multer";

import { getAllDatabases } from "./controllers/TestController";
import { postUpload } from "./controllers/ApplicationController";
import { multerConfig } from "./multerConfig";
import { dateFilter } from "./filters/DateFilter";
import { unauthenticatedRouter } from "./routes/UnauthenticatedRouter"; 
import { userRouter } from "./routes/UserRouter";
const app = express();
const upload = multer(multerConfig);

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

app.use(session({ name:'kainos-job-roles', secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 }}));

declare module "express-session" {
  interface SessionData {
    token: string;
  }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/test', getAllDatabases);
app.post('/upload',upload.single('file'), postUpload)
app.get('/upload', async (req: express.Request, res: express.Response): Promise<void> => {
  res.render('upload.html');
});

app.get('/upload-success', async (req: express.Request, res: express.Response): Promise<void> => {
  res.render('apply-succesful.html');
});

app.use('/',userRouter);

app.use('/', unauthenticatedRouter);

