import { NextResponse } from "next/server";
import User from "../models/User";
import { connectDB } from "../lib/database";


export const createUser = async (req) => {
    try {
        await connectDB(); // Ensure DB is connected
        
        const data = await req.json(); // ✅ Await `req.json()`
        const newUser = await User.create(data); 

        return NextResponse.json(newUser, { status: 201 }); // ✅ Correct response
    } catch (error) {
        console.error("❌ Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
