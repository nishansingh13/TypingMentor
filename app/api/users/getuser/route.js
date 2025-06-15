import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectDB } from '../../lib/database';
import User from '../../models/User';


export async function GET(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
 
    if (!tokenCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  


    const token = tokenCookie.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const users = await User.find({ email }).select('-password');
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
