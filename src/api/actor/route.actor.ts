import { Router } from "express";
import { getByActor, postActor, putActor } from "./functions.actor";

export const actorRoutes: Router = Router();

actorRoutes.route( '/actor/:key?/:value?' ).get( getByActor );
actorRoutes.route( '/actor/updatActor' ).put( putActor );
actorRoutes.route( '/actor/createActor' ).post( postActor );