import * as mongoose from 'mongoose';

export const ConfigurationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  composants: {
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
  },
  user: {
    pseudo: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    mail: {
      type: String,
      required: true,
      trim: true,
      match: /^\w+@\w+\.\w+$/,
    },
    photo: {
      type: String,
      required: true,
      trim: true,
    },
  },
}, {
  toJSON: { virtuals: true },
  versionKey: false,
});
