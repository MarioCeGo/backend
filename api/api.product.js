import { productControllers } from "../controllers/index.js";
import { IsAdmin } from "../middleware/authenticated.js";
import express from "express";

const { Router } = express;
const apiProduct = Router();

apiProduct.post("/", productControllers.setProd);
apiProduct.get("/delete", productControllers.deleteProd);
apiProduct.get("/detailProd", IsAdmin, productControllers.detailProd);
apiProduct.get("/getAll", productControllers.getAll);


export { apiProduct }