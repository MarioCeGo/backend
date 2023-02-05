import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { generateRandomProduct } from "./utility/generators.js";
import routerProduct from "./router/router.product.js";
import routerUser from "./router/router.user.js";
import { MonogDB } from "./servers/mongoDB.js";
import { config } from "process";
import dotenv from "dotenv";
import parseArgs from "minimist";
import { fork } from "child_process";
import cluster from "cluster"
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy } from "passport-local"
import MongoStore from "connect-mongo";
import * as strategy from "./passport/strategy.js"
import User from "./models/user.model.js";
import { Authenticated } from "./middleware/authenticated.js";
import Product from "./models/product.model.js";
import CartController from "./controllers/cart.controllers.js";
import routerCart from "./router/router.cart.js";

const cart = new CartController();
dotenv.config();
MonogDB.init();

const args = parseArgs(process.argv.slice(2));
const app = express();
const PORT = process.env.PORT || args.PORT;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static("public"));

app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://admin:admin@cluster0.9dmwbiu.mongodb.net/ecommerce",
            ttl: 600,
        }),
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        rolling: false,
        cookie: {
            maxAge: 600000,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session())
app.use("/api/products", routerProduct);
app.use("/api/user", routerUser);
app.use("/api/cart", routerCart);


app.use("/info", (req, res) => {
    const info = {
        inputArgs: args,
        OS: process.platform,
        nodeV: process.version,
        memoryRSS: process.memoryUsage().rss,
        path: process.execPath,
        pID: process.pid,
        dirname: process.cwd()
    }
    res.send(info);
});
app.get("/api/randoms", (req, res) => {
    const { cant } = req.query;
    const subProcess = fork("./tareaFork");
    subProcess.on("message", msg => {
        if (msg == 'listo') {
            subProcess.send(cant ? cant : 100000000)
        } else {
            res.send(msg);
        }
    })
});

app.get("/", (req, res) => {
    if (req.session.cart == undefined) {
        req.session.cart = [];
    }
    res.redirect("/home")
});
app.use("/home", async (req, res) => {
    const prods = await Product.find().lean()
    if (req.session.cart == undefined) {
        req.session.cart = [];
    }
    try {
        const user = req.user;
        const { username, isAdmin } = user;
        res.render("home", { prods, username, isAdmin });
    } catch (error) {
        res.render("home", { prods });
    }

});
app.use("/product", routerProduct, (req, res) => {
    try {
        const username = req.user.username;
        res.render("product", { username });
    } catch (error) {
        res.render("product");
    }
})

app.use("/user", Authenticated, (req, res) => {
    res.render("user");
});
app.use("/login", (req, res) => {
    res.render("login");
});


app.use("/profile/account", async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findById(req.user._id).lean();
        res.render("profile/account", { user, username });
    } catch (error) {
        res.redirect("/user")
    }
});
app.use("/profile/purchases", async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findById(req.user._id).lean();
        const { orderID } = req.query;
        if (orderID) {
            const purchaseOrder = user.purchaseOrders.find(elem => elem.id == orderID).items;
            let total = 0;
            purchaseOrder.forEach(elem => {
                total += elem.priceTotal;
            })
            console.log(purchaseOrder)
            res.render("profile/purchases", { user, username, orderID, purchaseOrder, total });
        } else {
            res.render("profile/purchases", { user, username, orderID });
        }
    } catch (error) {
        res.redirect("/user");
    }
});
app.use("/profile/products", async (req, res) => {
    try {
        const addProd = req.query.addProd === "true";
        const username = req.user.username;
        const user = await User.findById(req.user._id).lean();
        const prods = await Product.find().lean()
        res.render("profile/products", { user, username, prods, addProd });
    } catch (error) {
        res.redirect("/user");
    }
});

app.use("/profile/settings", async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findById(req.user._id).lean();
        res.render("profile/settings", { user, username });
    } catch (error) {
        res.redirect("/user");
    }
});

app.use("/cart", async (req, res) => {
    try {
        const username = req.user.username;
        const cart = req.session.cart;
        const user = await User.findById(req.user._id).lean();
        let total = 0;
        cart.forEach(elem => {
            total += elem.priceTotal;
        })
        res.render("cart", { cart, username, user, total });
    } catch (error) {
        res.redirect("home");
    }
})

passport.use("login", new Strategy({ passReqToCallback: true }, strategy.login));
passport.use("signIn", new Strategy({ passReqToCallback: true }, strategy.signIn));
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

httpServer.listen(PORT, () => { console.log(`Listening in ${PORT}`) });

io.on('connection', (socket) => {
    console.log('User connected');
});
