import { NextResponse } from "next/server";
import User from "../models/User";
import { connectDB } from "../lib/database";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        const users = await User.find({});
        console.log("Found users:", users);
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
        return NextResponse.json({ error: "Failed to fetch data", details: errorMessage }, { status: 500 });
    }
};

export const loginUser = async (req) => {
    try {
        await connectDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 404 });
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
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return NextResponse.json({ 
            message: "User logged in successfully",
            token: `Bearer ${token}`,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data", details: error.message }, { status: 500 });
    }
};