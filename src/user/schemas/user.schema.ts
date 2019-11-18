import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    pseudonyme: {
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
}, {
    toJSON: { virtuals: true },
    versionKey: false,
})
