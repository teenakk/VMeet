import mongoose, { Schema } from "mongoose";


const userSchema = new Schema(
    {
        name: { type: String, reruirded: true },
        username: { type: String, reruirded: true, unique: true },
        password: { type: String, reruirded: true },
        token: { type: String }
    }
)

const User = mongoose.model("User", userSchema);

export { User };