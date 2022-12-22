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
import  dotenv  from "dotenv";
import parseArgs from "minimist";
import { fork } from "child_process";

dotenv.config();
MonogDB.init();

const args = parseArgs(process.argv.slice(2));
const app = express();
const PORT = process.env.PORT||args.PORT;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use("/api/products", routerProduct);
app.use("/api/user", routerUser);


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
})
app.use("/home", (req, res) => {
    const prods = generateRandomProduct();
    res.render("home",{prods})
})
app.use("/product", (req, res) => {
    res.render("product", )
})
app.use("/user", (req, res) => {
    res.render("user")
})

httpServer.listen(PORT, () => { console.log(`Listening in ${PORT}` ) });

io.on('connection', (socket) => {
    console.log('User connected');
});
  