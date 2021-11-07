import { Router } from "express";
import { getByCategory, postCategory } from "./functions.category";

export const categoryRoutes: Router = Router();

categoryRoutes.route( '/category/:key?/:value?' ).get( getByCategory );
categoryRoutes.route( '/category/createCategory' ).post( postCategory );