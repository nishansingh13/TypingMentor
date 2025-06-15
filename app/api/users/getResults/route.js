import { connectDB } from "../../lib/database";
import Results from "../../models/Results";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        await connectDB();
        const results = await Results.find().sort({ createdAt: -1 });
      
        
        if (!results || results.length === 0) {
            return new Response(JSON.stringify({ message: "No results found" }), { status: 404 });
        }
        
       
        return NextResponse.json({ results }, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching results:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch results" }), { status: 500 });
    }
}