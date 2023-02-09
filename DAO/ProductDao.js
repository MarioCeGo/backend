import { Product } from "../models/index.js";

class ProductDao {
    constructor(model) {
        this.model = model;
    }
    async getByCode(code) {
        return await this.model.findOne({ code: code });
    }
    async save(prod) {
        await this.model.create(prod);
    }
    async deleteProd(code) {
        await this.model.deleteOne({ code: code });
    }
}

const productDao = new ProductDao(Product);

export { productDao }
