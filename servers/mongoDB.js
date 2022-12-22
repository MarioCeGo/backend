import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const MonogDB = {
    init: async () => {
        try {
            mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB});
            console.log("Conexion exitosa")
        } catch (error) {
            console.log(error);
        }
    }
}