import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import defineRoutes from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.API_PORT;

app.use(bodyParser.json());

defineRoutes(app);

export default app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port || 3000}`);
});
