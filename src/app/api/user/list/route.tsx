import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of, lastValueFrom } from 'rxjs';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        // URL에서 검색 파라미터 추출
        const { searchParams } = new URL(request.url);
        const accountName = searchParams.get('accountId');
        const password = searchParams.get('password');

        // RxJS ajax 요청으로 데이터를 가져옴
        const fetchData$ = ajax
            .getJSON('https://jsonplaceholder.typicode.com/posts')
            .pipe(
                map(response => response), // 성공적으로 데이터를 받으면 처리
                catchError(error => {
                    console.error('Error fetching data:', error);
                    return of({ error: true, message: error.message }); // 에러 발생 시 처리
                })
            );

        // Observable을 Promise로 변환하여 비동기 방식으로 처리
        const data = await lastValueFrom(fetchData$);

        // JSON 응답 반환
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error });
    }
}
