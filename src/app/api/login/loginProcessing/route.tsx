import axios from 'axios';
import { NextResponse } from 'next/server';
export default async function POST(request: Request) {
  try {
    let {accountId, password} = await request.json();

    const response = await axios.post('http:localhost:8079/login-processing', JSON.stringify({
      accountName : accountId, password
    }),
    {
      headers:{'Content-Type': 'application/json'}
    });

    const data = response.data;
    if(response.status == 200 && data.code == 0){
      axios.defaults.headers.common['Authorization'] = data.data.token;
      return Response.json(true)
    }else{
      return Response.json(false)
    }
  } catch (error) {
    console.error(error);
    return Response.json(error);
  }
}