import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ProductSchema = new Schema({
    name: {type: String, required: true, max: 20, trim: true},
    description: {type: String, required: true, max: 100, trim: true},
    code: {type: String, required: true, max: 50, unique: true, index: true, trim: true},
    thumbnail: {type: String, required: true, trim: true},
    price: {type: Number, required: true, trim: true},
    stock: {type: Number, required: true, trim: true},
    timeStamp: {type: String, required: true, max: 20},
},{
    virtuals: true
}
);

ProductSchema.set("toJSON", {
    transform: (_, resp) =>{
        resp.id = resp._id;
        delete resp._id;
        return resp;
    }
});
const Product = mongoose.model(process.env.COLLECTION_PRODUCT, ProductSchema);

export default Product