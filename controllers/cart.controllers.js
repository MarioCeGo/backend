import Product from "../models/product.model.js";



class CartController {
    addItem(req, res) {
        const cart = req.session.cart;
        const code = req.params.code;
        Product.findOne({ code: code }).then((prod) => {
            if (prod) {
                // if(this.checkInCart(cart, code)){
                    const prodToAdd ={
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
                // }
            // }else{
            //     const posProd = cart.indexOf(prod);
            //     let prodInCart = cart[posProd];
            //     prodInCart.qty ++;
            //     prodInCart.priceTotal = prodInCart.qty * prodInCart.price;
            //     cart[posProd].push(prodInCart);
            }
            req.session.cart = cart;
            res.redirect("/home");
        })
    }
    checkInCart(cart, code) {
        const bool = false;
        cart.forEach(elem => {
            if (elem.code == code) {
                bool = true;
            }
        });
    }
    showCart(req, res){

    }
}

export default CartController