import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    }},
    { timestamps: true }
);

export default mongoose.model("Post", PostSchema);