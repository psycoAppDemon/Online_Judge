import { User } from "../models/user.js"
import bcrypt from 'bcryptjs';



export const signUpUser = async (req,res) => {
    try {
        const { firstname, lastname, email, password, userId } = req.body;
    
        // check whether none of the data was null
        if (!(firstname, lastname, email, password, userId)) {
          return res.status(404).send("Please enter all the required info");
        }
        
        //check if the user already exist or not
        const existingUser = await User.findOne({ 
            $or: [
                { email: email },
                { userId: userId },
              ]
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
    
        res.status(200).json({
          message: "User Registered Successfully!",
          newUser,
        });
      } catch (error) {
        console.error(error.message);
      }
};

