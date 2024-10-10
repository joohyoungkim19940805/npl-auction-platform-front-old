import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Dispatch, ReactNode, SetStateAction, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import FlexLayout from '@/components/flexLayout/FlexLayout';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { EmotionProvider } from '@/app/emotion';
import ConvertFontSize from '@/components/providers/FontSizeProvider';
import { headers } from 'next/headers'; // headers 함수 사용
import ScrollRestorationProvider from '@/components/providers/ScrollRestorationProvider';

const inter = Inter({ subsets: ['latin'] });

//<div className={classNames(style.red,style.btn)}>Hello Webpack!!!</div>
export const metadata: Metadata = {
    title: 'npl auction',
    description: ' TEST description ',
};
export const viewport: Viewport = {
    themeColor: 'black',
    width: 'device-width',
    height: 'device-height',
    initialScale: 1,
    maximumScale: 3.0,
    viewportFit: 'cover',
    interactiveWidget: 'resizes-visual',
};

//페이지 내부에서 병렬 컨텐츠를 이용할 경우 풀더 경로는 @

const RootLayout = ({
    children,
    top,
    bottom,
    left,
}: {
    children: ReactNode;
    top: ReactNode;
    bottom: ReactNode;
    left: ReactNode;
}) => {
    console.log(top, bottom, left);
    const userAgent = headers().get('user-agent') || '';

    // 정규식을 통해 User-Agent에서 모바일 기기 확인
    const isSsrMobile =
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
            userAgent
        );

    return (
        <html lang="ko" style={{ fontSize: `${isSsrMobile ? 14 : 12.5}px` }}>
            <ConvertFontSize />
            <body className={inter.className}>
                <EmotionProvider>
                    <FlexLayout
                        direction="column"
                        layoutName="home"
                        childrenTemplate={[
                            {
                                'data-grow': 0.18,
                                'data-is_resize': true,
                                isFitContent: true,
                                isFitResize: true,
                                containerName: 'top',
                            },
                            {
                                'data-grow': 3 - (0.25 + 0.19),
                                'data-is_resize': true,
                                containerName: 'main',
                            },
                            {
                                'data-grow': 0.195,
                                'data-is_resize': true,
                                isFitContent: true,
                                isFitResize: true,
                                containerName: 'bottom',
                            },
                        ]}
                    >
                        {top}

                        <FlexLayout
                            layoutName="main"
                            direction="row"
                            childrenTemplate={[
                                {
                                    'data-grow': 0,
                                    'data-is_resize': true,
                                    isFitContent: true,
                                    isFitResize: false,
                                    containerName: 'lnb',
                                },
                                {
                                    'data-grow': 2 - 0.2,
                                    'data-is_resize': true,
                                    containerName: 'content',
                                },
                            ]}
                        >
                            {left}
                            {children}
                        </FlexLayout>

                        {bottom}
                    </FlexLayout>
                </EmotionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
