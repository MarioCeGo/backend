import { Product } from "../models/index.js";

class ProductDao {
    constructor(model) {
        this.model = model;
    }
    async getAll() {
        return await this.model.find().lean();
    }
    async getByCode(code) {
        return await this.model.findOne(code);
    }
    async save(prod) {
        await this.model.create(prod);
    }
    async deleteProd(code) {
        await this.model.deleteOne({ code: code });
    }
    async updateProd(code, newProd) {
        await this.model.updateOne({ code: code }, newProd);
    }
}

const productDao = new ProductDao(Product);

export { productDao }
