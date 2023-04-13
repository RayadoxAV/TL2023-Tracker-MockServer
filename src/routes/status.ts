import { randomInt } from 'crypto';
import express, { Request, Response } from 'express';
import MockServer from '../server/server';

const status = express();

status.get('/all/status', async (request: Request, response: Response) => {

  const data = await MockServer.instance.pingAll();

  return response.status(200).json({
    requestStatus: 'SUCCESS',
    queryStatusCode: 0,
    data
  });
});

status.get('/hr/status', async (request: Request, response: Response) => {
  const data = await MockServer.instance.pingService(1);
  return response.status(200).json({
    requestStatus: 'SUCCESS',
    queryStatusCode: 0,
    serviceName: 'hr',
    idService: 1,
    data
  })
});

status.get('/finance/status', async (request: Request, response: Response) => {
  const data = await MockServer.instance.pingService(2);

  return response.status(200).json({
    requestStatus: 'SUCCESS',
    queryStatusCode: 0,
    serviceName: 'finance',
    idService: 2,
    data
  })
});
status.get('/dev/status', async (request: Request, response: Response) => {
  const data = await MockServer.instance.pingService(3);

  return response.status(200).json({
    requestStatus: 'SUCCESS',
    queryStatusCode: 0,
    serviceName: 'dev',
    idService: 3,
    data
  })
});
status.get('/research/status', async (request: Request, response: Response) => {
  const data = await MockServer.instance.pingService(4);

  return response.status(200).json({
    requestStatus: 'SUCCESS',
    queryStatusCode: 0,
    serviceName: 'research',
    idService: 4,
    data
  })
});
status.get('/operations/status', async (request: Request, response: Response) => {
  const data = await MockServer.instance.pingService(5);

  return response.status(200).json({
    requestStatus: 'SUCCESS',
    queryStatusCode: 0,
    serviceName: 'operations',
    idService: 5,
    data
  })
});

export default status;

