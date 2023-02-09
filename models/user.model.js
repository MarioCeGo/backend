import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const UserSchema = new Schema({
    username: { type: String, required: true, max: 20, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    age: { type: Number, required: true, trim: true },
    phoneNumber: { type: Number, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, index: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    purchaseOrders: { type: Array }
});
UserSchema.pre('save', async function (next) {
    if (this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    next();
});

const User = mongoose.model(process.env.COLLECTION_USER, UserSchema);

export { User };