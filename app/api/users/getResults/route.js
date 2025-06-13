import Results from "../../models/Results";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        const results = await Results.find().sort({ createdAt: -1 });
        const highestWPM = results.reduce((max, result) => Math.max(max, result.netWpm), 0);
        let sum =0;
        for(let i=0; i<results.length; i++){
            console.log("Result:", results[i].netWpm);
            sum+= results[i].netWpm;
        }
        console.log("Sum of WPM:", sum);
        console.log(results.length);
        const averageWPM = sum/results.length || 0; // Calculate average WPM, default to 0 if no results
        if (!results || results.length === 0) {
            return new Response(JSON.stringify({ message: "No results found" }), { status: 404 });
        }
        // averageWPM = averageWPM.toFixed(2); // Ensure averageWPM is a number with two decimal places
        console.log("Average WPM:", averageWPM);
       
        return NextResponse.json({ results, averageWPM, highestWPM }, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching results:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch results" }), { status: 500 });
    }
}