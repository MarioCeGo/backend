import {  Product } from "../models/index.js";

const goHome = (req, res) => {
    try {
        if (req.session.cart == undefined) {
            req.session.cart = [];
        }
        res.redirect("/home");
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500);
    }
}

const viewHome = async (req, res) => {
    try {
        const prods = await Product.find().lean();
        if (req.session.cart == undefined) {
            req.session.cart = [];
        }
        if (req.user) {
            const user = req.user;
            const { username, isAdmin } = user;
            res.render("home", { prods, username, isAdmin });
        } else {
            res.render("home", { prods });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500);
    }
}

export { goHome, viewHome }