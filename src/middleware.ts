import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAuthenticated = checkAuthentication(request);
    console.log('kjg test ::: ', isAuthenticated);
    if (request.nextUrl.pathname.startsWith('/authorization')) {
        if (!isAuthenticated) {
            console.log('request', request, request.url, request.nextUrl);
            return NextResponse.redirect(
                new URL(
                    `/unauthorized?redirect_uri=${encodeURIComponent(request.url)}`,
                    request.nextUrl.origin
                ),
                {
                    status: 302,
                }
            );
        }
    }

    return NextResponse.next(); // 인증된 경우 계속 진행
}

function checkAuthentication(request: NextRequest) {
    // 여기에 인증 로직을 작성합니다. 예를 들어, 쿠키나 헤더에서 토큰을 확인할 수 있습니다.
    console.log('kjg test :::?????? ');

    const token = request.cookies.get('auth-token');

    //return token && token.value === 'valid-token'; // 가상의 토큰 검증 로직
    return false;
}

export const config = {
    matcher: ['/authorization/:path*'], // 이 미들웨어가 보호할 경로
};
