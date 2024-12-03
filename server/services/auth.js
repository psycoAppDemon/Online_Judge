import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
function setUser(user) {
  try {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    return token;
  } catch (error) {
    console.error("Error generating JWT:", error.message);
    return null; // Return null if there's an error
  }
}

function getUser(token) {
  if (!token) {
    console.error("No token provided for verification.");
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null; // Return null if token is invalid or verification fails
  }
}

export { setUser, getUser };
