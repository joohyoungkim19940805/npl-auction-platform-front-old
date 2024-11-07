'use client';
import { callApi, callApiCache } from '@handler/service/CommonService';
import { useEffect, useState } from 'react';
import { catchError, Subject } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

const loginSubject = new Subject<boolean>();

export const useIsLogin = () => {
    const [isLogin, setIsLogin] = useState<boolean | null>(null);
    const [isCallFetchSwitch, setIsCallFetchSwitch] = useState(false);
    useEffect(() => {
        if (!isCallFetchSwitch) return;
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
                setIsCallFetchSwitch(false);
            });

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [isCallFetchSwitch]);

    useEffect(() => {
        const subscription = loginSubject.subscribe(isLogin => {
            setIsLogin(isLogin);
        });
        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    return { isLogin, setIsCallFetchSwitch };
};

export const handleLogout = () => {};
