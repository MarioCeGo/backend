import UserDto from "../DTO/UserDto.js";
import { User } from "../models/index.js";

class UserDao {
    constructor(model) {
        this.model = model;
    }
    async getInfoBill(id) {
        return new UserDto(await this.model.findById(id));
    }
}

const userDao = new UserDao(User);

export { userDao }