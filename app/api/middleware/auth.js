import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const authenticate = async (request) => {
    try {
        const token = request.headers.get("Authorization");
        
        if (!token) {
            return NextResponse.json(
                { error: "Access denied. No token provided." },
                { status: 401 }
            );
        }

        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return NextResponse.json(
                { error: "Invalid token format" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid token" },
            { status: 401 }
        );
    }
};
