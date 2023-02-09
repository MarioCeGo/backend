import { productDao } from "../DAO/ProductDao.js";

const addNewProd = async (prod) => {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    prod.timeStamp = timeStamp;
    console.log(prod)
    await productDao.save(prod);
}

const deleteProd = async (code) => {
    await productDao.deleteProd(code);
}

export { addNewProd, deleteProd };