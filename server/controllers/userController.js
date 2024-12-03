import { User } from "../models/user.js";
import { submission } from "../models/submission.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { setUser, getUser } from "../services/auth.js";

dotenv.config();

function changeTokenExpiry(token) {
  try {
    const decoded = jwt.decode(token);

    const newToken = jwt.sign({ ...decoded, exp: 0 }, process.env.JWT_KEY);

    return newToken;
  } catch (error) {
    console.error("Error changing token expiry:", error);
    return null;
  }
}

export const signUpUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, userId } = req.body;

    // check whether none of the data was null
    if (!(firstname, lastname, email, password, userId)) {
      return res.status(400).json({ verdict: "Some inputs are missing" });
    }

    //check if the user already exist or not
    const existingUser = await User.findOne({
      $or: [{ email: email }, { userId: userId }],
    });

    if (existingUser) {
      return res.status(400).json({ verdict: "User Already Exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      userId,
      password: hashedPassword,
    });

    const userToSend = newUser.toObject();
    delete userToSend.password;
    const token = setUser(newUser);
    if (!token) {
      throw new Error("Failed to generate authentication token.");
    }
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: false,
    });
    return res.status(200).json({
      vertict: "User Registered Successfully!",
      user: { email, userId, user_id: newUser._id },
    });
  } catch (error) {
    console.error(`SignUp Error: ${error.message}`);
    return res.status(500).json({
      vertict: "Server error during Sign Up",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  console.log("Login");
  const { email, userId, password } = req.body;
  const reqtoken = req.cookies.token;
  if (reqtoken && reqtoken !== "undefined" && reqtoken !== "null") {
    console.log(reqtoken);
    const payload = getUser(reqtoken);
    console.log(payload);
    if (payload) {
      const getUserById = await User.findById(payload._id);
      return res.status(200).json({
        verdict: "User verified with token",
        user: {
          email: getUserById.email,
          userId: getUserById.userId,
          role: getUserById.role,
        },
      });
    } else {
      return res
        .status(400)
        .json({
          vertict: "Invalid Token",
        })
        .clearCookie("token");
    }
  }

  if (!(email || userId)) {
    return res.status(400).json({
      vertict: "Please enter username or password!",
    });
  }
  console.log(email);
  const user = await User.findOne({ $or: [{ email }, { userId }] });
  if (!user) {
    return res.status(400).json({
      verdict: "User doesn't exist!",
    });
  }

  const isPasswordMatched = await bcrypt.compareSync(password, user.password);
  if (!isPasswordMatched) {
    return res.status(400).json({
      verdict: "Incorrect Password!",
    });
  }

  const token = setUser(user);
  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: false,
  });

  return res.status(200).json({
    verdict: "User logged in successfully!",
    user: {
      userId: user.userId,
      _id: user._id,
      email: user.email,
      role: user.role,
    },
  });
};

export const logoutUser = async (req, res) => {
  changeTokenExpiry(req.cookies["token"]);
  res.clearCookie("token");
  return res.status(200).json({
    verdict: "Logged out successfully",
  });
};

export const getUserDetail = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    verdict: "Logged out successfully",
  });
};

export const getSubmission = async (req, res) => {
  const reqtoken = req.cookies.token;
  if (reqtoken && reqtoken !== "undefined" && reqtoken !== "null") {
    console.log(reqtoken);
    const payload = getUser(reqtoken);
    if (payload) {
      const getUserById = await User.findById(payload._id);
      
      const result = await submission.find(
        { _id: { $in: getUserById.submission } },
        { problemId: 1, verdict: 1 } // Adjust field names based on your schema
      );
      //console.log(JSON.stringify(result));  
      return res.status(200).json({
        verdict: "User submissons details fetched successfully!",
        submission: result,
      });
    }
  } else {
    res.status(400).json({
      verdict: "User not logged in!",
    });
  }
};
