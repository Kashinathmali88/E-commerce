import validator from "validator";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// register user
const registerUser = async (req, res) => {
  try {
    // get the data from req
    const { name, email, password } = req.body;

    // check for email validation
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "please enter a valid email" });
    }

    // check for existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // check password strong
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special symbol.",
      });
    }

    // encrypt the password using bcrypt js
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create new user entry in db
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create user" });
    }
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Credentials" });
  }

  const token = createToken(user._id);
  const option = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  };

  res.cookie("token", token, option);

  return res.status(200).json({
    message: "Logged In successfully",
    token: token,
    success: true,
  });
};

// user auth check
const isAuthUser = async (req, res) => {
  res.status(200).json({ success: true });
};

// get me
const getUser = async (req, res) => {
  req.userId;
  const user = await User.findById({ _id: req.userId }).select("-password");
  if (!user) {
    return res.status(403).json({ success: false, message: "User not found" });
  }
  return res.status(200).json({ success: true, user: user });
};

// isAuth
const isAuth = async (req, res) => {
  res.status(200).json({ success: true });
};

// logout user
const userLogOut = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.json({ success: true, message: "Logged out successfully" });
};

// admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = createToken(process.env.ADMIN_ID);
      const option = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      };

      return res
        .cookie("adminToken", token, option)
        .json({ success: true, token, message: "Admin logged successfully" });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// admin logOut
const adminLogOut = async (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.json({ success: true, message: "Logged out successfully" });
};
export {
  loginUser,
  registerUser,
  adminLogin,
  getUser,
  isAuth,
  adminLogOut,
  isAuthUser,
  userLogOut,
};
