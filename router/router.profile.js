import express from "express";
import { profileControllers } from "../controllers/index.js";
import { User, Product } from "../models/index.js";

const { Router } = express;
const routerProfile = Router();

routerProfile.get("/", profileControllers.goToProfile);

routerProfile.get("/account", profileControllers.viewAccount);

routerProfile.all("/purchases", profileControllers.viewPurchases);

routerProfile.get("/settings", profileControllers.viewSettings);

routerProfile.get("/products", profileControllers.viewProducts);

routerProfile.all("/product/detail", )

export { routerProfile }