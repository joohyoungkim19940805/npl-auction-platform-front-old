import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme'; // Material-UI 테마 파일

type Props = {
    children: React.ReactNode;
};

// SSR을 위한 Material-UI 및 Emotion 설정
export const EmotionProvider = ({ children }: Props) => {
    return (
        <AppRouterCacheProvider options={{ key: 'mui', prepend: true }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
};
