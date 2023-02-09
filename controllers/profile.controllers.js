import { servicesProfile } from "../services/index.js";
import { User, Product } from "../models/index.js";

const goToProfile = (req, res) => {
    res.redirect("profile/account");
}

const viewAccount = async (req, res) => {
    try {
        const { user, username } = await getDataUser(req);
        res.render("profile/account", { user, username });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500);
    }
}

const viewPurchases = async (req, res) => {
    try {
        const { user, username } = await getDataUser(req);
        const { orderID } = req.query;
        const purchases = await servicesProfile.getPurchases(orderID, user);
        if (purchases) {
            const { purchaseOrder, total } = purchases;
            res.render("profile/purchases", { user, username, orderID, purchaseOrder, total });
        } else {
            res.render("profile/purchases", { user, username, orderID });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500);
    }
}

const viewSettings = async (req, res) => {
    try {
        const { user, username } = await getDataUser(req);
        res.render("profile/settings", { user, username });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500);
    }
}

const viewProducts = async (req, res) => {
    try {
        if (req.query.addProd) {
            const addProd = req.query.addProd === "true";
            const { user, username } = await getDataUser(req);
            const prods = await Product.find().lean()
            res.render("profile/products", { user, username, prods, addProd });
        } else {
            res.redirect("profile");
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500);
    }
}

const getDataUser = async (req) => {
    const username = req.user.username;
    const user = await User.findById(req.user._id).lean();
    return { user, username }
}

export { goToProfile, viewAccount, viewPurchases, viewSettings, viewProducts }