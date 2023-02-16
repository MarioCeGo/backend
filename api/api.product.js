import { productControllers } from "../controllers/index.js";
import { IsAdmin } from "../middleware/authenticated.js";
import express from "express";

const { Router } = express;
const apiProduct = Router();

apiProduct.post("/", IsAdmin, productControllers.setProd);
apiProduct.get("/delete", IsAdmin, productControllers.deleteProd);
apiProduct.get("/detailProd", IsAdmin, productControllers.detailProd);

export { apiProduct }