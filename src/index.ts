import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import Logger, { LogType } from './util/logger';
import MockServer from './server/server';

import router from './routes/router';

import cors from 'cors';

function start(): void {
  Logger.log('Inicializando servidor...', LogType.INFO);

  const server = MockServer.instance;

  server.app.use(express.urlencoded({ extended: true }));
  server.app.use(express.json());

  server.app.use(cors({ origin: true, credentials: true }));

  server.app.use((error: any, _: Request, response: Response, next: NextFunction) => {
    //@ts-ignore
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      console.log(error);
      return response.json({
        status: 400,
        error: {
          message: 'Bad body request'
        }
      });
    }

    next();
  });

  server.app.use(router);

  server.startServer(() => {
    Logger.log('Server successfully initialized', LogType.SUCCESS);
  });
}

start();
