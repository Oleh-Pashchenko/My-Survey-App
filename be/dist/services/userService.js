"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.addUser = void 0;
const userModel_1 = require("../models/userModel");
const addUser = async (userData) => {
    const existingUser = await userModel_1.UserModel.findOne({ name: userData.name });
    if (existingUser) {
        return existingUser;
    }
    const newUser = new userModel_1.UserModel(userData);
    await newUser.save();
    return newUser;
};
exports.addUser = addUser;
const getAllUsers = async () => {
    return await userModel_1.UserModel.find();
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=userService.js.map