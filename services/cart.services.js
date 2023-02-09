import { User, Product } from "../models/index.js";
import { generateRandomCode } from "../utility/generators.js"
import { sendMailCart, sendSMS } from "../utility/services.js"; 
import { userDao } from "../DAO/UserDao.js";


const addToCart = async (code, cart) => {
    const prod = await Product.findOne({ code: code });
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
    return cart
}

const removeFromCart = (code, cart) => {
    const prodFound = cart.find(elem => elem.code == code);
    const pos = cart.indexOf(prodFound);
    cart.splice(pos, 1);
}

const buy = async (cart, user) => {
    const id = generateRandomCode();
    const purchaseOrder = user.purchaseOrders;
    const newPurchaseOrder = [...purchaseOrder, { id: id, items: cart }];
    await User.updateOne({ "_id": user._id }, { purchaseOrders: newPurchaseOrder });
    updateStock(cart);
    // sendMailCart(req);
    // sendSMS(req);
}

const updateStock = (cart) => {
    cart.forEach((elem) => {
        Product.findOne({ code: elem.code }).then(async (prod) => {
            const newStock = prod.stock - elem.qty;
            await Product.updateOne({ code: prod.code }, { stock: newStock });
        });
    });
}

const auxViewCart = async (id, cart) => {
    const user = await userDao.getInfoBill(id);
    let total = 0;
    cart.forEach(elem => total += elem.priceTotal);
    return { total, user }
}

export { addToCart, removeFromCart, buy, auxViewCart }