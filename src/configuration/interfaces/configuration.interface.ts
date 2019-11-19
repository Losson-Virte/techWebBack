import { Document } from 'mongoose';
import { Composant } from '../../composant/interfaces/composant.interface';
import { User } from '../../user/interfaces/user.interface';

export interface Configuration extends Document {
  id: string;
  name: string;
  composants: Composant[];
  user: User;
}
