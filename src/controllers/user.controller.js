import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token from response
  // check for user creation
  // return

  const { fullName, email, username, password } = req.body;
  console.log("email", email, "passwd", password);

  // if(fullName === ""){
  //     throw new ApiError(400,"Fullname is required")
  // }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username alreday exists");
  }

  const avatarLocalpath = req.files?.avatar[0]?.path;
  const coverImgLocalpath = req.files?.coverImage[0]?.path;

  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalpath);
  const coverImg = await uploadOnCloudinary(coverImgLocalpath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await username.create({
    fullName,
    avatar: avatar?.url,
    coverImage: coverImg?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const newUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!newUser) {
    throw new ApiError(500, "Unable to register new user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, newUser, "User registered successfully"));
});

export { registerUser };
