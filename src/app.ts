import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import session from "express-session";
import { dateFilter } from "./filters/DateFilter";
import { unauthenticatedRouter } from "./routes/UnauthenticatedRouter";
import { userRouter } from "./routes/UserRouter";
import { setRoleInLocals } from "./middleware/SetLocalRoleMiddleware";
import dotenv from "dotenv";
dotenv.config();

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

app.use(session({ name:'kainos-job-roles', secret: 'SUPER_SECRET', cookie: { maxAge: 28800000 }}));

declare module "express-session" {
  interface SessionData {
    token: string,
    theme: string;
  }
}

// Setting the theme in the session
app.use((req, res, next) => {
  if (!req.session.theme) {
      req.session.theme = process.env.THEME ?? 'default';
  }  
  res.locals.theme = req.session.theme;
  console.log(res.locals.theme);
  next();
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.use(setRoleInLocals);
app.use('/', userRouter);

app.use('/', unauthenticatedRouter);

// Changing theme
app.use("/theme/:theme", (req, res) => {
  req.session.theme = req.params.theme;
  
  res.redirect('back');
})