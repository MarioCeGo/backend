import express from "express";
import { Authenticated } from "../middleware/authenticated.js";
import passport from "passport";

const { Router } = express;
const apiUser = Router();

apiUser.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), (req, res) => {
    res.redirect("/products/view");
}
);
apiUser.get("/login", Authenticated, (req, res) => {
    res.render("/");
});

apiUser.post("/signIn", passport.authenticate("signIn", { failureRedirect: "/failregister" }), (req, res) => {
    res.redirect("/");
}
);

apiUser.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/home");
})

export { apiUser }