import { routerHome, routerCart, routerProfile, routerProduct } from "./router/index.js";
import { Authenticated, IsAdmin } from "./middleware/authenticated.js";
import { apiCart, apiProduct, apiUser } from "./api/index.js";
import * as strategy from "./passport/strategy.js";
import { User, Product } from "./models/index.js";
import { Server as IOServer } from "socket.io";
import { MonogDB } from "./servers/mongoDB.js";
import { Server as HttpServer } from "http";
import { engine } from "express-handlebars";
import { Strategy } from "passport-local";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import compression from "compression";
import { fork } from "child_process";
import { fileURLToPath } from "url";
import { config } from "process";
import parseArgs from "minimist";
import passport from "passport";
import cluster from "cluster";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { productDao } from "./DAO/ProductDao.js";
import logger from "./logger.js";
import { cpus } from "os";


dotenv.config();
MonogDB.init();

if (cluster.isPrimary) {
    const numCPUs = cpus().length
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', worker => {
        cluster.fork()
    })
}else{
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
                mongoUrl: process.env.MONGO_SESSION_URL,
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
    app.use("/api/products", apiProduct);
    app.use("/api/user", apiUser);
    app.use("/api/cart", apiCart);
    app.use("/products", routerProduct);
    app.use("/profile", routerProfile);
    app.use("/cart", routerCart);
    app.use("/", routerHome);
    
    app.use("/user", Authenticated, (req, res) => {
        res.render("user");
    });
    
    app.get("/infoC", compression(), async (req, res) => {
        res.send(tareaGZIP())
    })
    app.get("/info", async (req, res) => {
        res.send(tareaGZIP())
    })
    const tareaGZIP = async () => {
        const prod = await productDao.getAll();
        let aux = ""
        prod.forEach(elem => {
            for (let index = 0; index < 1000; index++) {
                aux += elem.thumbnail
            }
        })
        return aux
    }
    app.get("/*", (req, res) => {
        logger.warn("Ruta inexistente");
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
    
    httpServer.listen(PORT, () => { logger.info(`Listening in ${PORT}`) });
    
    io.on('connection', (socket) => {
        console.log('User connected');
    });
}


