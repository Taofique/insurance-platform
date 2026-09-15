import bcrypt from "bcrypt";
import User from "../models/User.js";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const registerUser = async (data: RegisterData) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "client",
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export default registerUser;
