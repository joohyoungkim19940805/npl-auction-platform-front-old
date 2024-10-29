'use client';
import { callApiCache } from '@handler/service/CommonService';
import { ResponseWrapper } from '@type/ReesponseWrapper';
import { AccountType } from '@type/service/AccountType';
import { useEffect, useState } from 'react';
import { catchError, map, of, Subject } from 'rxjs';
import { AjaxError, ajax } from 'rxjs/ajax';

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
                resultHandler: response => {
                    const isLoggedIn =
                        response.status === 200 || response.status === 201;
                    loginSubject.next(isLoggedIn);
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
                    return of(false);
                })
            )
            .subscribe(() => {
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
export const getAccountInfoService = () => {
    return ajax<ResponseWrapper<AccountType>>(
        '/api/account/search/get-info'
    ).pipe(
        map(response => {
            console.log(response.response);
            return response.response.data;
        }),
        catchError((error: AjaxError) => {
            console.log(error);
            return of(null);
        })
    );
};
