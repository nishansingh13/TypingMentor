import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
export const authenticate = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
      
        
        if (!token) {
            return NextResponse.json(
                { error: "Access denied. No token provided." },
                { status: 401 }
            );
        }

        // Remove the Bearer token format check
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (verifyError) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid token" },
            { status: 401 }
        );
    }
};