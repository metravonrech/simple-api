import express, { Router } from 'express';

export type RegisterRouteFunc = (router: Router) => Router;

const getRoutes = (routeFunctions: RegisterRouteFunc[]) => {
  const router = express.Router();

  return routeFunctions.map((func) => func(router));
};

export { getRoutes };

