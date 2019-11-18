import { Document } from 'mongoose';

export interface User extends Document {
    id: string;
    pseudo: string;
    password: string;
    photo: string;
}
