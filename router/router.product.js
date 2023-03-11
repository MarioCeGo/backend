import express from "express";
import { productControllers } from "../controllers/index.js";

const { Router } = express;
const routerProduct = Router();

routerProduct.all("/view", productControllers.productsView);

export { routerProduct };