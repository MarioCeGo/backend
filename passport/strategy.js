import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sendEmailSignUp } from "../utility/services.js";

const validatePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

const login = (req, username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            return done(err);
        } else if (!user) {
            console.log("Usuario no existente");
            return done(null, false);
        } else if (!validatePassword(user, password)) {
            console.log("Contraseña incorrecta");
            return done(null, false);
        }
        return done(null, user);
    }).lean();
}

const signIn = (req, username, password, done) => {
    const createUser = () => {
        User.findOne({ username: username }, async (err, user) => {
            if (err) {
                console.log("Error al registrar");
            } else if (user) {
                console.log("Usuario ya registrado");
            } else {
                const userList = await User.find();

                if (userList.length) {
                    const { username, name, lastName, address, age, phoneNumber, email, password } = req.body;
                    User.create({ username, name, lastName, address, age, phoneNumber, email, password });
                    sendEmailSignUp(username, name, lastName, address, age, phoneNumber, email);
                }else{
                    const { username, name, lastName, address, age, phoneNumber, email, password } = req.body;
                    const isAdmin = true;
                    User.create({ username, name, lastName, address, age, phoneNumber, email, password, isAdmin });
                    sendEmailSignUp({ username, name, lastName, address, age, phoneNumber, email});
                }
            }
        })
    }
    process.nextTick(createUser);
}

export { login, signIn }