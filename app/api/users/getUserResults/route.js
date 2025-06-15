import { cookies } from "next/headers";
import { connectDB } from "../../lib/database";
import Results from "../../models/Results";
import jwt from "jsonwebtoken";
export async function GET(req){
    try{
        await connectDB();
        
       const cookieStore = await cookies();
       const tokenData = cookieStore.get('token');
       if (!tokenData) {
           return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
       }
       const token = tokenData.value;
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const id = decoded.id;
       const data = await Results.find({uid:id});
     
       if (!data) {
           return new Response(JSON.stringify({ error: 'Results not found' }), { status: 404 });
       }
       return new Response(JSON.stringify(data), { status: 200 });

    }catch(err){
        console.error('Error in GET request:', err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}