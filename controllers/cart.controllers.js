import { servicesCart } from "../services/index.js";

const addItem = async (req, res) => {
    try {
        const cart = req.session.cart;
        const code = req.params.code;
        req.session.cart = await servicesCart.addToCart(code, cart);
        res.redirect("/products/view");
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500);
    }

}
const removeItem = async (req, res) => {
    try {
        const cart = req.session.cart;
        const code = req.params.code;
        await servicesCart.removeFromCart(code, cart);
        res.redirect("/cart");
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500);
    }
}
const checkout = async (req, res) => {
    try {
        if (req.user) {
            const cart = req.session.cart;
            const user = req.user;
            await servicesCart.buy(cart, user);
            req.session.cart = [];
            res.redirect("/products/view");
        } else {
            res.redirect("/user");
        }
    } catch (error) {
        console.log(`Error ${error}`);
        res.status(500);
    }
}
const viewCart = async (req, res) => {
    try {
        if (req.user) {
            const { username, _id } = req.user;
            const cart = req.session.cart;
            const { total, user } = await servicesCart.auxViewCart(_id, cart);
            res.render("cart", { username, user, cart, total });
        } else {
            res.redirect("user");
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500);
    }
}

export { addItem, removeItem, checkout, viewCart };