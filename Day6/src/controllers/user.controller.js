import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //     message: "chai aur code"
  // })

  const { fullName, email, username, password } = req.body;
  console.log("email", email);

  //Check if fullName is empty
  if (fullName === "") {
    throw new ApiError(400, "FullName required");
  }

  // Check if email is empty
  if (email === "") {
    throw new ApiError(400, "Email required");
  }

  // Check if username is empty
  if (username === "") {
    throw new ApiError(400, "Username required");
  }

  // Check if password is empty
  if (password === "") {
    throw new ApiError(400, "Password required");
  }

  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });

  if(existedUser) {
    throw new ApiError (409," User with email or username Exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError (400,"Avatar is missing bro")
  }


});

export { registerUser };
