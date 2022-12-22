import express from "express";
import product from "../models/product.model.js";

const { Router } = express
const routerProduct = Router();

routerProduct.post("/", async (req, res) => {
    try {
        const { productName, productDescription, productCode, productThumbnail, productPrice, productStock } = req.body
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
        console.log(prod)
        await product.create(prod);
        res.sendStatus(200)

    } catch (error) {
        console.log("error")
        res.sendStatus(500)
    }

})

export default routerProduct

