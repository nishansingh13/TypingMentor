import { connectDB } from "../../lib/database";
import { authenticate } from "../../middleware/auth";
import Results from "../../models/Results";

export async function POST(req) {
    const { wpm, netWpm, accuracy, wordCount, typeOfTest , timeCount } = await req.json();
       if(wpm==0 || netWpm==0 || accuracy==0 || typeOfTest==""){ 
        return new Response("");
    }
    try{
        if(wordCount==0 && timeCount==0){
            return new Response("");
        }
        await connectDB();
        const auth = await authenticate();
        console.log("Auth:", auth);
        if(auth.error) {
            return auth; 
        }
        if(auth.status === 401) {
            return new Response(JSON.stringify({ error: "Unauthorized" }) );
        }
        else if(auth.status === 403) {
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
        }
        else if(auth.status === 404) {
            return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
        }
        const uid = auth.id;
        const username = auth.username;
        console.log(username);
        
        
        const result = new Results({
            wpm,
            netWpm,
            accuracy,
            wordCount,
            timeCount,
            typeOfTest,
            uid,
            username
        })
        console.log(result);
          await result.save()
        return new Response (JSON.stringify({ message: "Data saved successfully" }), { status: 200 });

    }
    catch (error) {
        console.error("Error saving data:", error);
        return new Response(JSON.stringify({ error: "Failed to save data" }), { status: 500 });
    }
}