import express from "express";
import { cartControllers } from "../controllers/index.js";

const { Router } = express
const apiCart = Router();

apiCart.get("/add/:code", cartControllers.addItem);

apiCart.get("/remove/:code", cartControllers.removeItem);

apiCart.get("/buy", cartControllers.checkout);

export { apiCart };

