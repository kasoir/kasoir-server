import { Router } from 'express';
import { authRoutes } from './auth/route.auth';
import { userRoutes } from './user/route.user';
import { movieRoutes } from './movie/route.movie';
import { actorRoutes } from './actor/route.actor';
import { directorRoutes } from './director/route.director';
import { reportRoutes } from './report/route.report';


export const apiRoutesNA: Router = Router();

apiRoutesNA.use( userRoutes );
apiRoutesNA.use( actorRoutes );
apiRoutesNA.use( movieRoutes );
apiRoutesNA.use( directorRoutes );
apiRoutesNA.use( reportRoutes );
apiRoutesNA.use( authRoutes );