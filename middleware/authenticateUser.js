import user from "../models/user.model.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();

// const authenticateUser = async (req, res, next) => {
//     const { username, password } = req.body;
//     console.log({ username, password })
//     const userFinded = await user.find({ username: username });
//     const hash = userFinded[0].password
//     bcrypt.compare(String(password), hash, function (err, result) {
//         if (result) {
//             res.cookie("user", { username: username, hash: hash });
//             next();
//         }
//     })
// }

// app.use(cookieParser())




// export default authenticateUser