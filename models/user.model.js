import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const UserSchema = new Schema({
    username: { type: String, required: true, max: 20, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true,  trim: true, index: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
})
// UserSchema.pre("save", async (next) => {
//     try {
//         if (this.password) {
//             const hash = await bcrypt.hash(this.password, "asdnuaiwfashke");
//             this.password = hash;
//         }
//         next();
//     } catch (error) {
//         console.log(error)
//     }
// })

const user = mongoose.model(process.env.COLLECTION_USER, UserSchema);

export default user