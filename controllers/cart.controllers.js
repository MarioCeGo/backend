import Product from "../models/product.model.js";

class CartController {
    addItem(req, res) {
        const cart = req.session.cart;
        const code = req.params.code;
        Product.findOne({ code: code }).then((prod) => {
            if (prod) {
                const prodFound = cart.find(elem => elem.code == code);
                if (!prodFound) {
                    const prodToAdd = {
                        id: prod._id,
                        name: prod.name,
                        description: prod.description,
                        code: prod.code,
                        thumbnail: prod.thumbnail,
                        price: prod.price,
                        priceTotal: prod.price,
                        qty: 1
                    }
                    cart.push(prodToAdd);
                } else {
                    const pos = cart.indexOf(prodFound);
                    cart[pos].qty += 1;
                    cart[pos].priceTotal = cart[pos].price * cart[pos].qty;
                }
            }
            req.session.cart = cart;
            res.redirect("/home");
        })
    }
    removeItem(req, res) {
        const cart = req.session.cart;
        const code = req.params.code;
        const prodFound = cart.find(elem => elem.code == code);
        const pos = cart.indexOf(prodFound);
        cart.splice(pos, 1);
        res.redirect("/cart");
    }
}

export default CartController