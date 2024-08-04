import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url) 
    const accountName = searchParams.get("accountId");
    const password = searchParams.get("password");
//

    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')

    const data = response.data;
 
    return Response.json({ data })
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}