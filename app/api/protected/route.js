import { NextResponse } from "next/server";
import { authenticate } from "../middleware/auth";

export async function GET(request) {
    const auth = await authenticate(request);
    if (auth.error) {
        return auth; 
    }

    return NextResponse.json({ 
        message: "Protected data", 
        user: auth 
    });
}
