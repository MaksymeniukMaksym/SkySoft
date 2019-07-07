const User = require("../models/user");


class UserService {
    async static createUser({ name, password, salt }) {
        return await User.create({ name, password, salt });
    }

    async static getUser(id) {
        return await User.findOne({
          where: id,
        });
    }
}

module.exports = UserService;