import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
},
{timestamps:true})

export const User = mongoose.model("User",userSchema);