import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcyrpt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, //Cloudinary url
      required: true,
    },
    coverImage: {
      type: String, //Cloudinary url
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    refershToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcyrpt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcyrpt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id: this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
})

}



userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id: this._id
    },
process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:process.env.REFERSH_TOKEN_EXPIRY
})

}


userSchema.methods.generateRefreshToken= function(){

}


export const User = mongoose.model("User", userSchema);
