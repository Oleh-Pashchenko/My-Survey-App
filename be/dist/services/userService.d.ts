/// <reference types="mongoose" />
import { CreateUserDTO } from '../dtos/user.dto';
declare const addUser: (userData: CreateUserDTO) => Promise<import("../interfaces/users.interface").User & import("mongoose").Document<any, any, any>>;
declare const getAllUsers: () => Promise<(import("../interfaces/users.interface").User & import("mongoose").Document<any, any, any>)[]>;
export { addUser, getAllUsers };
