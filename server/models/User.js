import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    followers: { type: Array, defaultValue: [] },
    following: { type: Array, defaultValue: [] },
    type: {
        type: String,
        enum: ['pt', 'member'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }},
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);