import express from "express";
import { IsAdmin } from "../middleware/authenticated.js";
import product from "../models/product.model.js";

const { Router } = express;
const routerProduct = Router();

routerProduct.post("/", IsAdmin, async (req, res) => {
    try {
        const { productName, productDescription, productCode, productThumbnail, productPrice, productStock } = req.body;
        const date = new Date();
        const timeStamp = date.toLocaleString();
        const prod = {
            name: productName,
            description: productDescription,
            code: productCode,
            thumbnail: productThumbnail,
            price: productPrice,
            stock: productStock,
            timeStamp
        };
        await product.create(prod);
        res.redirect("/profile/products?addProd=true");
    } catch (error) {
        console.log("error")
        res.sendStatus(500);
    }
});

routerProduct.get("/item/:id", (req, res) => {
    const id = req.params.id;
    console.log("id");
    res.send(id);
})

export default routerProduct

