const User = require("../models/user");


class UserService {
    async static createUser({ name, password }) {
        return await User.create({ name, password });
    }

    async static getUser(id) {
        return await User.findOne({
          where: id,
        });
    }
}

module.exports = UserService;