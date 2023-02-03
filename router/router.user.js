import express from "express";
import User from "../models/user.model.js";
import { Authenticated } from "../middleware/authenticated.js";

import passport from "passport";
import { Strategy } from "passport-local"

const { Router } = express;
const routerUser = Router();


routerUser.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), (req, res) => {
    res.redirect("/");
}
);
routerUser.get("/login", Authenticated, (req, res) => {
    console.log("llegue")
    res.render("/");
});

routerUser.post("/signIn", passport.authenticate("signIn", { failureRedirect: "/failregister" }), (req, res) => {
    res.redirect("/");
}
);

routerUser.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/home");
})

routerUser.get("/:_id", Authenticated, (req, res) => {
    const {_id} = req.params
    const user = User.findById(_id)
    console.log("hola")
    res.render("user");
});


export default routerUser