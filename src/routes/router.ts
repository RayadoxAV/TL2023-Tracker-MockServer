import express, { Request, Response } from 'express';
import { verifyLoggedIn } from '../middlewares/authorization';

import login from './login';
import services from './services';
import status from './status';
import record from './record';

const router = express();

router.get('/', (request: Request, response: Response) => {
  response.status(200).json({
    requestStatus: 'SUCCESS'
  });
});


router.use(login);
router.use(services);
router.use(status);
router.use(record);

export default router;

