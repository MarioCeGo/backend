import { Product } from "../models/index.js";

const addNewProd = async (prod) => {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    prod.timeStamp = timeStamp;
    console.log(prod)
    await Product.create(prod);
}

export { addNewProd };