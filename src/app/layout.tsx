import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'
import { useRouter } from "next/navigation";
import FlexLayoutWrapper from '@components/FlexLayout/FlexLayoutWrapper'
import GlobalAccountContextWrapper from '@/components/globalContextWrapper/GlobalAccountContextWrapper';
const inter = Inter({ subsets: ['latin'] })

//<div className={classNames(style.red,style.btn)}>Hello Webpack!!!</div>
export const metadata: Metadata = {
	title: 'BO Tempalte',
	description:' TEST description ',
}

//페이지 내부에서 병렬 컨텐츠를 이용할 경우 풀더 경로는 @

const RootLayout = ({
	children,
	header,
	footer,
	sideMenu
} : {
	children : ReactNode,
	header : ReactNode,
	footer : ReactNode,
	sideMenu : ReactNode
}) => {
	return (
		<html lang="ko">
			<body className={inter.className}>
				<GlobalAccountContextWrapper>
					<FlexLayoutWrapper direction='column' grow={[0.3, 1, 0.1]}>
						{header}
						
						<FlexLayoutWrapper direction='row' grow={[0.3, 1]}>
							{sideMenu}
							{children}
						</FlexLayoutWrapper>

						{footer}
					</FlexLayoutWrapper>
				</GlobalAccountContextWrapper>
			</body>
		</html>
	)
}

export default RootLayout;