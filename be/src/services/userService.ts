import { CreateUserDTO } from '../dtos/user.dto';
import { UserModel } from '../models/userModel';

const addUser = async (userData: CreateUserDTO) => {
  const existingUser = await UserModel.findOne({ name: userData.name });

  if (existingUser) {
    return existingUser;
  }

  const newUser = new UserModel(userData);
  await newUser.save();
  return newUser;
};

const getAllUsers = async () => {
  return await UserModel.find();
};

export { addUser, getAllUsers };
