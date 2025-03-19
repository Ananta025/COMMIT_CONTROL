import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    repositories:[
        {
            default: [],
            type: mongoose.Schema.Types.ObjectId,
            ref: "Repository"
        }
    ],
    followedUsers:[
        {
            default: [],
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    starRepositiries:[
        {
            default: [],
            type: mongoose.Schema.Types.ObjectId,
            ref: "Repository"
        }
    ]
})

const User = mongoose.model("User", userSchema);
export default User;