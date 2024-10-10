import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of, lastValueFrom } from 'rxjs';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        // Extract search parameters from the URL
        const { searchParams } = new URL(request.url);
        const accountName = searchParams.get('accountId');
        const password = searchParams.get('password');

        // RxJS ajax request to fetch data
        const fetchData$ = ajax
            .getJSON('https://jsonplaceholder.typicode.com/posts')
            .pipe(
                map(response => response),
                catchError(error => {
                    console.error('Error fetching data:', error);
                    return of({ error: true, message: error.message });
                })
            );

        // Convert the Observable to a Promise and await the result
        const data = await lastValueFrom(fetchData$);

        // Return the response as JSON
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error });
    }
}
