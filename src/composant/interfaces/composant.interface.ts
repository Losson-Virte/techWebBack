import { Document } from 'mongoose';

export interface Composant extends Document {
  id: string;
  type: string;
  name: string;
  price: number;
}
