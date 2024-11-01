'use client';
import { callApiCache } from '@handler/service/CommonService';
import { useEffect, useState } from 'react';
import { catchError, Subject } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

const loginSubject = new Subject<boolean>();

export const useIsLogin = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isFetch, setIsFetch] = useState(false);
    useEffect(() => {
        if (!isFetch) return;
        const subscription = callApiCache<void, void>(
            {
                method: 'GET',
                path: 'account',
                endpoint: 'is-login',
                resultInterceptor: result => {
                    const isLoggedIn = result.ok;
                    loginSubject.next(isLoggedIn);
                    return result.json();
                    //setIsLogin(isLoggedIn);
                },
            },
            {
                cacheTime: 1000 * 30,
                cacheName: 'isLogin',
            }
        )
            .pipe(
                catchError((error: AjaxError) => {
                    console.log(error);
                    loginSubject.next(false);
                    //setIsLogin(false);
                    return Promise.reject();
                })
                //switchMap(e => e) // Promise를 Observable로 변환하여 직접 사용할 수 있도록 함
            )
            .subscribe(e => {
                setIsFetch(false);
            });

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [isFetch]);

    useEffect(() => {
        const subscription = loginSubject.subscribe(isLogin => {
            setIsLogin(isLogin);
        });
        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    return { isLogin, setIsFetch };
};
