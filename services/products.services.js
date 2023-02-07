import Product from "../models/product.model.js";

const addNewProd = async (prod) => {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    prod.timeStamp = timeStamp;
    await Product.create(prod);
}

export { addNewProd };