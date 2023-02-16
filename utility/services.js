import { createTransport } from "nodemailer";
import twilio from "twilio"
import dotenv from "dotenv";

dotenv.config();

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    }
});

const sendEmailSignUp = async (username, name, lastName, address, age, phoneNumber, email) => {
    const mailOptions = {
        from: 'Ecommerce',
        to: process.env.MAIL,
        subject: 'Nuevo registro',
        html:
            `<h1>Nuevo Registro</h1>
        <br>
        <p>Username: ${username}</p>
        <p>Name: ${name}</p>
        <p>Last name: ${lastName}</p>
        <p>Address: ${address}</p>
        <p>Age: ${age}</p>
        <p>Phone number: ${phoneNumber}</p>
        <p>Email: ${email}</p>`
    }
    await transporter.sendMail(mailOptions)
}
const sendMailCart = async (req) => {
    const cart = req.session.cart;
    const listProd = [];
    cart.forEach(elem => {
        const html = `<hr><p>Product: ${elem.name}</p><br><p>Quantity: ${elem.qty}</p><br><p>Code: ${elem.code}</p><hr>`
        listProd.push(html);
        console.log(html)
    })
    const msg = JSON.stringify(cart);
    const mailOptions = {
        from: 'Ecommerce',
        to: process.env.MAIL,
        subject: `Nuevo pedidio de ${req.user.name} ${req.user.lastName} | ${req.user.email}`,
        html:
            `<h1>Nuevo pedido</h1>
        <br>
        ${listProd}`
    }
    await transporter.sendMail(mailOptions)
}

// const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const sendSMS = async (req) => {
    const cart = req.session.cart;
    const listProd = [];
    cart.forEach(elem => {
        const msg = `Product: ${elem.name} | Quantity: ${elem.qty} | Code: ${elem.code} |---| `;
        listProd.push(msg);
    })
    const msg = await client.messages.create({
        body: `Nuevo pedido - ${listProd}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+${req.user.phoneNumber}`
    })
    const msgAdmin = await client.messages.create({
        body: `Nuevo pedido - ${listProd}`,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:+${req.user.phoneNumber}`
    })
}
export { sendEmailSignUp, sendMailCart, sendSMS }