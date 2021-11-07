import { Router } from "express";
import { jwtAuthPost } from "./functions.auth";

export const authRoutes: Router = Router();
authRoutes.route( '/auth' ).post( jwtAuthPost );