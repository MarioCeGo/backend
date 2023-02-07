import express from "express";
import { Authenticated } from "../middleware/authenticated.js";
import passport from "passport";

const { Router } = express;
const routerUser = Router();

routerUser.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), (req, res) => {
    res.redirect("/");
}
);
routerUser.get("/login", Authenticated, (req, res) => {
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

export default routerUser