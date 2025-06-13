import { NextResponse } from "next/server";
import { authenticate } from "../middleware/auth";

export async function GET(request) {
    try{
    const auth = await authenticate(request);

    if (auth.error) {
        return auth; 
    }
    if(auth.status === 401) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    else if(auth.status === 403) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    else if(auth.status === 404) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

       return NextResponse.json({ 
        message: "Protected data", 
        user: auth
    });
} catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
}
 
}
