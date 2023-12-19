"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.addUser = void 0;
const tslib_1 = require("tslib");
const userService = tslib_1.__importStar(require("../services/userService"));
const addUser = async (req, res) => {
    try {
        const user = await userService.addUser(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).send({ message: 'Error adding user', error });
    }
};
exports.addUser = addUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).send({ message: 'Error retrieving users', error });
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=userController.js.map