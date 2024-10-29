import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/authorization')) {
        const isAuthenticated = await checkAuthentication(request);
        if (!isAuthenticated) {
            console.log(
                'request',
                request,
                request.url,
                request.nextUrl.origin
            );
            return NextResponse.redirect(
                new URL(
                    `/unauthorized?redirect_uri=${encodeURIComponent(`${request.nextUrl.origin}/unauthorized/login-process?redirect_uri=${request.url}`)}`,
                    request.nextUrl.origin
                ),
                {
                    status: 302,
                }
            );
        }
    }
    const response = NextResponse.next();
    // /unauthorized/login-process 접근 시, token 쿼리스트링 값을 Authorization 쿠키로 설정
    const token = request.nextUrl.searchParams.get('token');
    if (token) {
        response.cookies.set('Authorization', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: 'lax',
        });
        request.nextUrl.searchParams.delete('token');

        // token 쿼리 파라미터를 제거한 새 URL로 리다이렉트
        return NextResponse.redirect(request.nextUrl.toString());
    }
    return response; // 인증된 경우 계속 진행
}

async function checkAuthentication(request: NextRequest) {
    // 여기에 인증 로직을 작성합니다. 예를 들어, 쿠키나 헤더에서 토큰을 확인할 수 있습니다.
    console.log('kjg test :::?????? ');

    const token = request.cookies.get('Authorization');

    //return token && token.value === 'valid-token'; // 가상의 토큰 검증 로직

    // 외부 API 호출을 통해 토큰 검증

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/account/search/is-login`,
            {
                method: 'GET',
                headers: {
                    Authorization: token?.value || '',
                    // 필요한 경우 추가 헤더를 여기에 포함
                },
            }
        );

        if (response.ok) {
            return true;
        } else {
            console.error('인증 API 오류:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('토큰 검증 중 오류 발생:', error);
        return false;
    }
}
export const config = {
    matcher: ['/:path*', '/authorization/:path*'], // 모든 경로와 /authorization 경로를 보호
};
