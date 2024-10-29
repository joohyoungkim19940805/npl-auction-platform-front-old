import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    // Authorization 쿠키 값을 가져오기
    const token = request.cookies.get('Authorization')?.value || '';

    // 클라이언트로 쿠키 값 전달
    return NextResponse.json({ token }, { status: 200 });
}
