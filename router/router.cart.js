import express from "express";
import CartController from "../controllers/cart.controllers.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { generateRandomCode } from "../utility/generators.js";
import { sendMailCart, sendSMS } from "../utility/services.js";

const cart = new CartController();

const { Router } = express
const routerCart = Router();

routerCart.get("/add/:code", cart.addItem);
routerCart.get("/remove/:code", cart.removeItem)

routerCart.get("/buy", async (req, res) => {
    if (req.user) {
        const cart = req.session.cart;
        const user = req.user;
        const id = generateRandomCode()
        const purchaseOrder = user.purchaseOrders;
        const newPurchaseOrder = [...purchaseOrder, { id: id, items: cart }]
        await User.updateOne({ "_id": user._id }, { purchaseOrders: newPurchaseOrder })
        updateStock(cart);
        // sendMailCart(req);
        // sendSMS(req);
        req.session.cart = [];
        res.redirect("/home");
    } else {
        res.redirect("/user");
    }

});
routerCart("/", async (req, res) => {
    try {
        const username = req.user.username;
        const cart = req.session.cart;
        const user = await User.findById(req.user._id).lean();
        let total = 0;
        cart.forEach(elem => {
            total += elem.priceTotal;
        })
        res.render("cart", { cart, username, user, total });
    } catch (error) {
        res.redirect("home");
    }
})

const updateStock = (cart) => {
    cart.forEach((elem) => {
        Product.findOne({code: elem.code}).then(async (prod) =>{
            const newStock = prod.stock - elem.qty;
            await Product.updateOne({code: prod.code}, {stock: newStock});
        })
    })
}

export default routerCart