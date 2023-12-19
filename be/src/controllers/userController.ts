import { Request, Response } from 'express';
import * as userService from '../services/userService';
export const addUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.addUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({ message: 'Error adding user', error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving users', error });
  }
};
