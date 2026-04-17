import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["admin", "staff"],
        default: "staff"
    },
    org:{
        type:String,
        required:true
    }
}, { timestamps: true });
const userModel =mongoose.model("User",UserSchema);
export default userModel;