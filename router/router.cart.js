import express from "express";
import { cartControllers } from "../controllers/index.js";

const { Router } = express;
const routerCart = Router();

routerCart.get("/", cartControllers.viewCart);

export { routerCart };