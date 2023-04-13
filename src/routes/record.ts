import express, { Request, Response } from 'express';
import connection from '../db/connection';
import { MysqlError } from 'mysql';

const record = express();

record.get('/record', (request: Request, response: Response) => {
  const query = 'SELECT * FROM record;';

  connection.query(query, async (error: MysqlError, result: any[]) => {
    if (error) {
      return response.status(500).json({
        requestStatus: 'ERROR',
        queryStatusCode: 1,
        errror: {
          message: 'Internal server error'
        }
      });
    }

    return response.status(200).json({
      requestStatus: 'SUCCESS',
      result
    });
  });
});

export default record;
