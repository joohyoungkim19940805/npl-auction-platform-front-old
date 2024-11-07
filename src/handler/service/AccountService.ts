import { callApi } from '@handler/service/CommonService';
import { ResponseWrapper } from '@type/ReesponseWrapper';
import { AccountType } from '@type/service/AccountType';
import { catchError, map, of, Subject, switchMap } from 'rxjs';

export const getAccountInfoService = () => {
    return callApi<void, ResponseWrapper<AccountType>>({
        method: 'GET',
        path: 'account',
        endpoint: 'get-info',
        headers: {
            'Cache-Control': 'no-cache',
        },
    }).pipe(
        catchError((errorResponse: Response) => {
            return of(null);
        })
    );
};
