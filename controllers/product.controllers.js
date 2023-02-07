import { servicesProduct } from "../services";

const setProd = async (req, res) => {
    try {
        const { productName, productDescription, productCode, productThumbnail, productPrice, productStock } = req.body;
        await servicesProduct.addNewProd({ productName, productDescription, productCode, productThumbnail, productPrice, productStock });
        res.redirect("/profile/products?addProd=true");
    } catch (error) {
        console.log(`Error ${error}`);
        res.sendStatus(500);
    }
}

export { setProd };