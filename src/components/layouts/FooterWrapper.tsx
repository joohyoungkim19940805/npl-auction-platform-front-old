'use client';
import { Box, Typography, Link as MuiLink, Divider } from '@mui/material';
import { ReactNode } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
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
        <>
            <Box
                component="footer"
                sx={{
                    marginTop: '2rem',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#f5f5f5', // 연한 회색 배경
                        color: '#333', // 다크한 텍스트 색상
                        padding: '0.5rem 1rem',
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        borderTop: '1px solid #ddd', // 구분선 추가
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1dvh',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Link
                            href="/company"
                            underline="hover"
                            sx={{ marginRight: '1rem' }}
                        >
                            회사소개
                        </Link>
                        <Link
                            href="/customer-center"
                            underline="hover"
                            sx={{ marginRight: '1rem' }}
                        >
                            고객센터
                        </Link>
                        <Link
                            href="/terms"
                            underline="hover"
                            sx={{ marginRight: '1rem' }}
                        >
                            이용약관
                        </Link>
                        <Link
                            href="/privacy-policy"
                            underline="hover"
                            sx={{ marginRight: '1rem' }}
                        >
                            개인정보취급방침
                        </Link>
                    </Box>
                    <Typography
                        component="span"
                        sx={{ fontSize: '0.75rem', marginLeft: '1rem' }}
                    >
                        본 사이트는 이메일주소를 무단수집하는 행위를 거부합니다.
                        [법률 제 8486호]
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        padding: '1rem',
                        justifyItems: isMobile ? 'normal' : 'center',
                        '& a': {
                            color: '#ffffff',
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
};
export default FooterWrapper;
