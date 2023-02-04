import express  from "express";
import CartController from "../controllers/cart.controllers.js";
import { sendMailCart, sendSMS } from "../utility/services.js";

const cart = new CartController();

const { Router } = express
const routerCart = Router();

routerCart.get("/add/:code", cart.addItem);

routerCart.get("/buy", (req, res)=>{
    if(req.user){
        const cart = req.session.cart;
        sendMailCart(req);
        sendSMS(req);
        req.session.cart = [];
        res.redirect("/home");
        // res.status(200).send("ok");

    }else{
        res.redirect("/user");
    }
    
})

export default routerCart