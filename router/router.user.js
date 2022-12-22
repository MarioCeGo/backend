import express from "express";
import user from "../models/user.model.js";

const { Router } = express
const routerUser = Router();

routerUser.post("/signIn", async (req, res) => {
    try {
        const { username, name, lastName, email, password } = req.body;
        const userObject = { username, name, lastName, email, password };
        const usersList = await user.find();
        if (usersList.length) {
            await user.create(userObject);
        } else {
            userObject.isAdmin = true;
            await user.create(userObject);
        }
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
});
routerUser.get("/logIn", async (req, res) => {
    const { email, password } = req.body;

});

export default routerUser