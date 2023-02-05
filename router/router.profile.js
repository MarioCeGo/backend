import express from "express";
import User from "../models/user.model.js";

const { Router } = express;
const routerProfile = Router();

routerProfile.get("/account", async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findById(req.user._id).lean();
        res.render("profile/account", { user, username });
    } catch (error) {
        res.redirect("/user")
    }
});
routerProfile.get("/purchases", async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findById(req.user._id).lean();
        const { orderID } = req.query;
        if (orderID) {
            const purchaseOrder = user.purchaseOrders.find(elem => elem.id == orderID).items;
            let total = 0;
            purchaseOrder.forEach(elem => {
                total += elem.priceTotal;
            })
            console.log(purchaseOrder)
            res.render("profile/purchases", { user, username, orderID, purchaseOrder, total });
        } else {
            res.render("profile/purchases", { user, username, orderID });
        }
    } catch (error) {
        res.redirect("/user");
    }
});
routerProfile.post("/products", async (req, res) => {
    try {
        const addProd = req.query.addProd === "true";
        const username = req.user.username;
        const user = await User.findById(req.user._id).lean();
        const prods = await Product.find().lean()
        res.render("profile/products", { user, username, prods, addProd });
    } catch (error) {
        res.redirect("/user");
    }
});
// routerProfile.get("/products", async (req, res) => {
//     try {
//         const addProd = req.query.addProd === "true";
//         const username = req.user.username;
//         const user = await User.findById(req.user._id).lean();
//         const prods = await Product.find().lean()
//         res.render("profile/products", { user, username, prods, addProd });
//     } catch (error) {
//         res.redirect("/user");
//     }
// });

routerProfile.get("/settings", async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findById(req.user._id).lean();
        res.render("profile/settings", { user, username });
    } catch (error) {
        res.redirect("/user");
    }
});

export default routerProfile