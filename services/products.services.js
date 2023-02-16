import { productDao } from "../DAO/ProductDao.js";

const addNewProd = async (prod) => {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    prod.timeStamp = timeStamp;
    await productDao.save(prod);
}

const deleteProd = async (code) => {
    await productDao.deleteProd(code);
}

const detailProd = async (code) => {
    const prod = await productDao.getByCode(code);
    return prod
}

const updateProd = async (code, newProd) =>{
    await productDao.updateProd(code, newProd);
}

export { addNewProd, deleteProd, detailProd, updateProd };