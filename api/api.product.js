import { productControllers } from "../controllers/index.js";
import { IsAdmin } from "../middleware/authenticated.js";
import express from "express";

const { Router } = express;
const apiProduct = Router();

apiProduct.post("/", IsAdmin, productControllers.setProd);

export { apiProduct }