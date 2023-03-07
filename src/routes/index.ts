import { Express } from 'express';

import { stackRoutes } from 'resourses/stack';
import { storageRoutes } from 'resourses/storage';

const defineRoutes = (app: Express) => {
  app.use('/stack', stackRoutes);
  app.use('/storage', storageRoutes);
};

export default defineRoutes;