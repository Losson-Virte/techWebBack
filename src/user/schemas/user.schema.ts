import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    pseudonyme: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    mail: {
        type: String,
        required: true,
        trim: true,
        match: /^\w+@\w+\.\w+$/
    }
}, {
    toJSON: { virtuals: true },
    versionKey: false
})
