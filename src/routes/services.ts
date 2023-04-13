import express, { Request, Response } from 'express';
import connection from '../db/connection';
import { MysqlError } from 'mysql';
import MockServer from '../server/server';

const services = express();

services.get('/services', (request: Request, response: Response) => {

  return response.status(200).json({
    requestStatus: 'SUCCESS',
    result: MockServer.instance.getServices()
  });
});

export default services;
