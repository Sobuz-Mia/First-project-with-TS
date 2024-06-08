import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// applications routes

app.use('/api/v1', router);

const Test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};
app.get('/', Test);

// global error handler routes

app.use(globalErrorHandler);

// not found

app.use(notFound);

export default app;
