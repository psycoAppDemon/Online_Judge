import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_KEY,
    { expiresIn: "1d" }
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    return null; // Return null if token is invalid
  }
}

export { setUser, getUser };
