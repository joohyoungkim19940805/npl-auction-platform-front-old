'use client';
import { Box, Typography, Link as MuiLink, Divider } from '@mui/material';
import { ReactNode } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const FooterWrapper = ({
    children,
    isSsrMobile,
}: {
    children: ReactNode;
    isSsrMobile: boolean;
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
        defaultMatches: isSsrMobile,
    }); // 모바일 화면 여부 판단
    return (
        <Box
            component="footer"
            sx={{
                display: 'grid',
                backgroundColor: '#1976d2',
                color: '#fff',
                padding: '1rem',
                marginTop: '2rem',
                justifyItems: isMobile ? 'normal' : 'center',
                '& a': {
                    color: '#ffffff',
                    textDecoration: 'underline',
                },
            }}
        >
            {children}
        </Box>
    );
};
export default FooterWrapper;
