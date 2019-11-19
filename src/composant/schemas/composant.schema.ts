import * as mongoose from 'mongoose';

export const ComposantSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
}, {
  toJSON: { virtuals: true },
  versionKey: false,
});
