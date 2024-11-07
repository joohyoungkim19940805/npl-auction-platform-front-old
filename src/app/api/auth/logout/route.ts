import { NextResponse } from 'next/server';

export async function GET() {
    const response = NextResponse.redirect('/'); // 로그아웃 후 리다이렉트할 경로
    response.cookies.delete('Authorization'); // Authorization 쿠키 제거

    return NextResponse.json({ status: 200 });
}
