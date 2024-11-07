import { ResponseWrapper } from '@type/ReesponseWrapper';
import {
    BehaviorSubject,
    Observable,
    Subscriber,
    catchError,
    concatMap,
    from,
    map,
    of,
    shareReplay,
    switchMap,
    take,
    tap,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import { AjaxError, AjaxResponse, ajax } from 'rxjs/ajax';

const methodsMapper = {
    GET: 'search',
    POST: 'regist',
    PUT: 'update',
    DELETE: 'delete',
};
export interface ServiceArguments<T, R> {
    path: string;
    endpoint: string;
    method: keyof typeof methodsMapper;
    body?: T;
    resultInterceptor?: (response: Response) => R;
    headers?: Readonly<Record<string, string>>;
}
export interface CacheForService {
    cacheName: string;
    cacheTime: number;
    cacheSize?: number;
}

interface CacheMap<T> {
    [key: string]: BehaviorSubject<Observable<T>>;
}
const defaultHeaders: Record<string, string> = {};
const cacheMap: CacheMap<unknown> = {};
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const setDefaultHeaders = (headers: Record<string, string>) => {
    Object.assign(defaultHeaders, headers);
};

const withTokenHeader = (): Observable<string> => {
    if (typeof window === 'undefined') {
        // 서버 환경에서 `cookies` 모듈을 한 번만 동적으로 임포트하여 `serverCookies`에 저장
        const returnServerSideToken = from(
            import('next/headers').then(async ({ cookies }) => {
                return (await cookies()).get('Authorization')?.value || '';
            })
        );

        return returnServerSideToken;
    }

    // 클라이언트 환경에서는 ajax 호출을 통해 토큰을 가져옴
    return ajax<{ token: string }>('/api/auth/token').pipe(
        map(response => {
            const token = response.response.token;
            defaultHeaders['Authorization'] = `${token}`;
            return token;
        })
    );
};
// T : request body, R : response data
export const callApi = <T, R>(serviceArguments: ServiceArguments<T, R>) => {
    const token$ = defaultHeaders['Authorization']
        ? of(defaultHeaders['Authorization'])
        : withTokenHeader();

    return token$.pipe(
        concatMap(token => {
            const newHeaders = {
                ...defaultHeaders,
                ...(serviceArguments.headers || {}),
            };
            newHeaders['Authorization'] = token;
            // console.log('defaultHeaders : ', defaultHeaders);
            // console.log('serviceArguments : ', serviceArguments);
            // console.log('token : ', token);
            return fromFetch(
                `${apiUrl}/api/${serviceArguments.path}/${methodsMapper[serviceArguments.method]}/${serviceArguments.endpoint}`,
                {
                    method: serviceArguments.method,
                    body: serviceArguments.body
                        ? JSON.stringify(serviceArguments.body)
                        : undefined,
                    headers: newHeaders,
                }
            ).pipe(
                map(response => {
                    if (serviceArguments.resultInterceptor) {
                        return Promise.resolve(
                            serviceArguments.resultInterceptor(response)
                        );
                    }
                    if (!response.ok) {
                        return Promise.reject(response);
                    }
                    return response.json() as Promise<R>;
                }),
                switchMap(e => e)
            );
        })
    );
};
/*
export const callApi = <T, R>(serviceArguments: ServiceArguments<T, R>) => {
    const headers$ = defaultHeaders['Authorization']
        ? of(defaultHeaders)
        : setTokenHeader().pipe(map(() => defaultHeaders));

    return headers$.pipe(
        concatMap(headers =>
            ajax<ResponseWrapper<R>>({
                url: `${apiUrl}/api/${serviceArguments.path}/${methodsMapper[serviceArguments.method]}/${serviceArguments.endpoint}`,
                body: serviceArguments.body,
                method: serviceArguments.method,
                headers: {
                    ...headers,
                    ...(serviceArguments.headers || {}),
                },
            }).pipe(
                map(result => {
                    if (serviceArguments.resultInterceptor) {
                        return serviceArguments.resultInterceptor(result);
                    }
                    return result.response.data;
                })
            )
        )
    );
};
*/
const callApiForCache = <T, R>(
    serviceArguments: ServiceArguments<T, R>,
    cacheForService: CacheForService
) => {
    let token$;
    if (typeof window === 'undefined') {
        // server side인 경우 개인화된 데이터를 캐싱하지 않도록 수정 // 2024 10 31
        token$ = of('');
    } else {
        token$ = defaultHeaders['Authorization']
            ? of(defaultHeaders['Authorization'])
            : withTokenHeader();
    }
    return token$.pipe(
        concatMap(token => {
            const newHeaders = {
                ...defaultHeaders,
                ...(serviceArguments.headers || {}),
            };

            newHeaders['Authorization'] = token;
            return fromFetch(
                `${apiUrl}/api/${serviceArguments.path}/${methodsMapper[serviceArguments.method]}/${serviceArguments.endpoint}`,
                {
                    body: serviceArguments.body
                        ? JSON.stringify(serviceArguments.body)
                        : undefined,
                    method: serviceArguments.method,
                    headers: newHeaders,
                }
            ).pipe(
                map(response => {
                    if (serviceArguments.resultInterceptor) {
                        return Promise.resolve(
                            serviceArguments.resultInterceptor(response)
                        );
                    }
                    if (!response.ok) {
                        return Promise.reject();
                    }
                    return response.json() as Promise<R>;
                }),
                switchMap(e => e),
                shareReplay(
                    cacheForService.cacheSize || 1,
                    cacheForService.cacheTime
                )
            );
        })
    );
};

export const callApiCache = <T, R>(
    serviceArguments: ServiceArguments<T, R>,
    cacheForService: CacheForService
) => {
    let cacheSubject = cacheMap[cacheForService.cacheName] as BehaviorSubject<
        Observable<R>
    >;
    if (!cacheSubject) {
        cacheSubject = new BehaviorSubject(
            callApiForCache(serviceArguments, cacheForService)
        );
        cacheMap[cacheForService.cacheName] = cacheSubject as BehaviorSubject<
            Observable<unknown>
        >;
    }
    // const cacheSubject = new BehaviorSubject(
    //     callApiForCache(serviceArguments, cacheForService),
    // );
    return cacheSubject.pipe(
        concatMap(shared =>
            shared.pipe(
                tap({
                    complete: () =>
                        cacheSubject.next(
                            callApiForCache(serviceArguments, cacheForService)
                        ),
                })
            )
        ),
        take(1)
        // catchError((error: AjaxError) => {
        //     console.error(error);
        //     return of(null);
        // })
    );
};

const createSSE = <T>(observer: Subscriber<T>, url: string) => {
    let eventSource = new EventSource(url, {
        withCredentials: false,
    });

    eventSource.onmessage = event => {
        console.log('message : ', event);
        observer.next(JSON.parse(event.data) as T);
    };

    eventSource.onerror = error => {
        console.log('error', error);
        console.log('readyState:', eventSource.readyState); // 추가 디버깅 정보

        if (eventSource.readyState != 0) {
            observer.error(error);
            setTimeout(() => {
                eventSource = createSSE(observer, url);
            }, 3000); // 3초 후 재연결
        } else {
            eventSource.close();
        }
    };
    return eventSource;
};

export const createSSEObservable = <T>(url: string) => {
    return new Observable<T>(observer => {
        let eventSource = createSSE<T>(observer, url);
        return () => {
            eventSource.close();
        };
    });
};
