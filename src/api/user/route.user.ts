import { Router } from "express";
import { postUser, getByUser } from "./functions.user";

export const userRoutes: Router = Router();

userRoutes.route('/user/:key?/:value?').get(getByUser);
userRoutes.route('/user/').post(postUser);