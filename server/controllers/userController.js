import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { setUser, getUser } from "../services/auth.js";

dotenv.config();

function changeTokenExpiry(token) {
  try {
    const decoded = jwt.decode(token);

    const newToken = jwt.sign({ ...decoded, exp: "0" }, process.env.JWT_SECRET);

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
      return res.status(404).send("Please enter all the required info");
    }

    //check if the user already exist or not
    const existingUser = await User.findOne({
      $or: [{ email: email }, { userId: userId }],
    });

    if (existingUser) {
      return res.status(400).send("User already exist");
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

    res.status(200).json({
      message: "User Registered Successfully!",
      email,
      userId,
      user_id: newUser._id,
      token: setUser(newUser)
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const loginUser = async (req, res) => {
  console.log("Login");
  const { email, userId, password } = req.body;
  const reqtoken = req.cookies["token"];
  if (reqtoken) {
    const payload = getUser(reqtoken);
    if (payload) {
      const getUserById = await User.findById(payload._id);
      return res.status(200).json({
        message: "User verified with token",
        userId: getUserById.userId,
        _id: getUserById._id,
        email: getUserById.email,
        role: getUserById.role,
      });
    } else {
      res.clearCookie("token");
    }
  }

  if (!(email || userId)) {
    return res.status(400).json({
      message: "Please enter username or password!",
    });
  }

  const user = await User.findOne({ $or: [{ email }, { userId }] });
  if (!user) {
    return res.status(400).json({
      message: "User doesn't exist!",
    });
  }

  const isPasswordMatched = await bcrypt.compareSync(password, user.password);
  if (!isPasswordMatched) {
    return res.status(400).json({
      message: "Incorrect Password!",
    });
  }

  const token = setUser(user);
  const option = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httponly: true, //so that cookie can be manipulated by backend only
  };

  return res.status(200).cookie("token", token, option).json({
    message: "User logged in successfully!",
    token,
    userId: user.userId,
    _id: user._id,
    email: user.email,
    role: user.role
  });
};

export const logoutUser = async (req, res) => {
  changeTokenExpiry(req.cookies["token"]);
  res.clearCookie("token");
  return res.status(200).json({
    message: "logged out successfully",
  });
};

export const getUserDetail = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "logged out successfully",
  });
};
