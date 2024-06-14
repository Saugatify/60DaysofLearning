import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  // Validate inputs
  if (fullName === "") {
    throw new ApiError(400, "FullName required");
  }
  if (email === "") {
    throw new ApiError(400, "Email required");
  }
  if (username === "") {
    throw new ApiError(400, "Username required");
  }
  if (password === "") {
    throw new ApiError(400, "Password required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Upload avatar and cover image to Cloudinary
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    console.error("Failed to upload avatar to Cloudinary");
    throw new ApiError(500, "Failed to upload avatar");
  }

  // Create new user
  const newUser = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  });

  // Fetch created user to respond
  const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Failed to retrieve created user");
  }

  // Respond with success message
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

export { registerUser };
