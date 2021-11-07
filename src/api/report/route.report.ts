import { Router } from "express";
import { getReport } from "./functions.report";

export const reportRoutes: Router = Router();
reportRoutes.route( '/report/generateReport' ).post( getReport );
