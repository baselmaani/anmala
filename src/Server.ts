import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import '@tsed/ajv';
import '@tsed/swagger';
import { config, rootDir } from './config';
import { IndexCtrl } from './controllers/pages/IndexController';
import session from 'express-session';

@Configuration({
  ...config,
  componentsScan: [
    `${rootDir}/protocols/*{.ts,.js}`, // scan protocols directory
  ],
  passport: {},
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    '/rest': [`${rootDir}/controllers/**/*.ts`],
    '/': [IndexCtrl],
  },
  swagger: [
    {
      path: '/v3/docs',
      specVersion: '3.0.1',
    },
  ],
  views: {
    root: `${rootDir}/views`,
    extensions: {
      ejs: 'ejs',
    },
  },
  exclude: ['**/*.spec.ts'],
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      )
      .use(
        session({
          secret: process.env.SECRET || '123',
          resave: true,
          saveUninitialized: true,
          // maxAge: 36000,
          cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: 36000,
          },
        })
      );
  }
}
