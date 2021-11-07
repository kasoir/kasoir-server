import { Router } from "express";
import { getByDirector, postDirector, putDirector } from "./functions.director";

export const directorRoutes: Router = Router();

directorRoutes.route( '/director/:key?/:value?' ).get( getByDirector );
directorRoutes.route('/director/createDirector').post(postDirector);
directorRoutes.route('/director/updateDirector').put(putDirector);
