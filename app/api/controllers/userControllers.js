import { NextResponse } from "next/server";
import User from "../models/User";
import { connectDB } from "../lib/database";
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt, { decode } from 'jsonwebtoken';
  

export const createUser = async (req) => {
    try {
        await connectDB();
        
        const data = await req.json(); 
        const newUser = await User.create(data); 

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({error:error.errmsg}, { status: 500 });
    }
};

export const getUser = async (req) => {
    try {
        await connectDB();
        const cookieStore = await cookies();
        const tokenCookie=  cookieStore.get("token");
     
          if (!tokenCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
      const token = tokenCookie.value;
         const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const email = decoded.email;
        const users = await User.find({email:email}).select("-password"); 
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

export const registerUser = async (req) => {
    try {
        await connectDB();
        const { username, email, password } = await req.json();
        
        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 404 });
        }

        const userexist = await User.findOne({ username });
        if (userexist) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 });
        }

        const emailexist = await User.findOne({ email });
        if (emailexist) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        return NextResponse.json({ message: "User registered successfully" }, { status: 200 });
    } catch (error) {
        const errorMessage = error.message.startsWith("E11000") 
            ? "Username or email already exists" 
            : "Please fill all fields";
        return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
    }
};



export const loginUser = async (req) => {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const correctPass = await bcrypt.compare(password, user.password);
    if (!correctPass) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email ,username: user.username},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    
    const response = NextResponse.json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      }
    }, { status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to login", details: error.message },
      { status: 500 }
    );
  }
};
