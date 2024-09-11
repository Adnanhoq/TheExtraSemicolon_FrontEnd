import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { dateFilter } from "./filters/DateFilter";
import { unauthenticatedRouter } from "./routes/UnauthenticatedRouter";
import { userRouter } from "./routes/UserRouter";
import { setRoleInLocals } from "./middleware/SetLocalRoleMiddleware";

import { multerConfig} from "./multerConfig";
import multer from "multer";
import { postCSVUpload } from "./controllers/FileUploadController";

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

app.use(setRoleInLocals);
app.use('/', userRouter);
app.use('/', unauthenticatedRouter);

app.post('/uploadCSV',upload.array('files'), postCSVUpload);
app.get('/uploadCSV', async (req: express.Request, res: express.Response): Promise<void> => {
  res.render('csvFileUpload.html');
});
app.get('/upload-success', async (req: express.Request, res: express.Response): Promise<void> => {
  res.render('upload-success.html');
});

