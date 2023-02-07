import express from "express";
import { IsAdmin } from "../middleware/authenticated.js";
import { productControllers } from "../controllers/index.js";

const { Router } = express;
const routerProduct = Router();

routerProduct.post("/", IsAdmin, productControllers.setProd);

export default routerProduct

