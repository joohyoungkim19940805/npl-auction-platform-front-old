'use client'
import { Dispatch, ReactNode, SetStateAction, createContext, useState, useEffect } from 'react'
import { usePathname, useRouter, } from 'next/navigation';
interface AccountContext {
	isLogin: Boolean
	checkIsLoginForToken : Function;
	callLoginLogic : Function;
	callLogoutLogic : Function;
	accountSummary : AccountSummaryType;
}
type AccountSummaryType = {
	accountId: string,
	fullName: string
}

export const AccountContext = createContext<AccountContext>({
	isLogin : false,
	checkIsLoginForToken: ()=>false,
	callLoginLogic: (accountId: string, password: string) => false,
	callLogoutLogic: () => false,
	accountSummary : {} as AccountSummaryType
});

export default ({
    children
} : {
    children: ReactNode
}) => {
    const [isLogin, setIsLogin] = useState(false);
	const [accountSummary, setAccountSummary] = useState<AccountSummaryType>({} as AccountSummaryType);
	
	/**
	 * 본래 next js 쪽에서 jwt 라이브러리를 사용하면 
	 * 특정 스프링 시큐리티 처럼 hasAuth 방식으로 접근 제어가 가능하지만(구현이 살짝 어려움)
	 * 저희 프로젝트는 jwt를 java api쪽에서 핸들링 하기에 아래 방식으로 구현되어야 합니다.
	 * 
	 * jwt 라이브러리로 next쪽에서 구현시 next용 naver, kakao, google 로그인 구현 가능
	 * jwt 라이브러리로 미구현시 별도의 방법으로 구현 필요(ex)리엑트용 로그인 sdk)
	 */
	const value = {
		isLogin,
		checkIsLoginForToken: ()=>{
			// to do token check fetch login
			let token = ''
			let accountId = '';
			let fullName = '';
			setAccountSummary({accountId, fullName})
			setIsLogin(true)
			return true;
		},
		callLoginLogic: (accountId: string, password: string) => {
			// to do call login proc fetch logic
			setAccountSummary({accountId, fullName:'kim joo hyoung'})
			setIsLogin(true)
			return true;
		},
		callLogoutLogic: () => {
			//to do call logout proc fetch logic
			setAccountSummary({} as AccountSummaryType);
			setIsLogin(false);
			return false;
		},
		accountSummary
	};
    return (
		<AccountContext.Provider value = {value}>
			{children}
		</AccountContext.Provider>
    )
}