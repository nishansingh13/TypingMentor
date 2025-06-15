import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const cookieStore = await cookies();
        cookieStore.delete('token');
        return  NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    } catch (error) {
        console.error('Error during logout:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}