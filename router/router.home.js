import express from "express";
import { homeControllers } from "../controllers/index.js";

const { Router } = express;
const routerHome = Router();

routerHome.get("/", homeControllers.goHome);
routerHome.get("/home", homeControllers.viewHome);

export { routerHome };