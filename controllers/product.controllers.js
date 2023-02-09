import { servicesProduct } from "../services/index.js";

const setProd = async (req, res) => {
    try {
        const { productName, productDescription, productCode, productThumbnail, productPrice, productStock } = req.body;
        const prod = {
            name: productName,
            description: productDescription,
            code: productCode,
            thumbnail: productThumbnail,
            price: productPrice,
            stock: productStock
        };
        await servicesProduct.addNewProd(prod);
        res.redirect("/profile/products?addProd=true");
    } catch (error) {
        console.log(`Error ${error}`);
        res.sendStatus(500);
    }
}
const deleteProd = async (req, res) => {
    servicesProduct.deleteProd(req.query.prodCode);
}

export { setProd, deleteProd };