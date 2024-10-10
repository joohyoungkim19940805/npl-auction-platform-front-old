import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of, lastValueFrom } from 'rxjs';
import { NextResponse } from 'next/server';

export default async function POST(request: Request) {
    try {
        // Request에서 JSON 데이터 파싱
        const { accountId, password } = await request.json();

        // RxJS ajax를 이용한 POST 요청
        const postData$ = ajax({
            url: 'http://localhost:8079/login-processing',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accountName: accountId,
                password,
            }),
        }).pipe(
            map(response => response.response), // 응답 데이터 처리
            catchError(error => {
                console.error('Error during post request:', error);
                return of({ error: true, message: error.message }); // 에러 처리
            })
        );

        // Observable을 Promise로 변환하여 처리
        const data = await lastValueFrom(postData$);

        // 응답 상태와 데이터 코드 확인
        return NextResponse.json(true);
        /*
        if (data && data.code === 0) {
            // 성공적인 로그인 처리
            ajax.defaults.headers.common['Authorization'] = data.data.token;
            return NextResponse.json(true);
        } else {
            // 로그인 실패 시 처리
            return NextResponse.json(false);
        }*/
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }
}
