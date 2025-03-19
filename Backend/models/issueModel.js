import mongoose from "mongoose";


const issueSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum : ['open','closed'],
        default: 'open'
    },
    repository:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repository",
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // comments:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Comment"
    //     }
    // ],
    // createdAt:{
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt:{
    //     type: Date,
    //     default: Date.now
    // },
    // closedAt:{
    //     type: Date
    // }
});

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;