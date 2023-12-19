import { Document, Schema, model } from 'mongoose';
import { User } from '../interfaces/users.interface';

const userSchema = new Schema({
    name: { type: String, required: true }
});

export const UserModel = model<User & Document>('User', userSchema);
