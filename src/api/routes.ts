import { Router } from 'express';
import { categoryRoutes } from './category/route.category';

export const apiRoutes: Router = Router();

apiRoutes.use( categoryRoutes );
