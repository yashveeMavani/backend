import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation -not empty
  //check if user already exists: username, email
  //check fro images, check for avatar
  //upload them to cloudinary
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { fullName1, email1, username1, password1 } = req.body;
  // console.log("email:", email);

  if (
    [fullName1, email1, username1, password1].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const exitedUser = await User.findOne({
    $or: [{ username1 }, { email1 }],
  });

  console.log("exitedUser:", exitedUser);

  if (exitedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar1[0]?.path;
  // console.log("req.files:", req.files);s
  // console.log("avatarLocalPath:", avatarLocalPath);
  const coverImageLocalPath = req.files?.coverImage1[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar1 = await uploadOnCloudinary(avatarLocalPath);
  console.log("avatar1:", avatar1);
  const coverImage1 = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar1) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName1,
    avatar1: avatar1.url,
    coverImage1: coverImage1?.url || "",
    email1,
    password1,
    username1: username1.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export { registerUser };