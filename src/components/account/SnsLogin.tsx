'use client';
import { Box, Button } from '@mui/material';
import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
const SnsLogoButton = ({
    registration,
}: {
    registration: 'google' | 'naver' | 'kakao' | 'apple';
}) => {
    const src = `/${registration}_login.png`;
    //const href = '/oauth2/authorization/' + registration;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const searchParams = useSearchParams();
    const path = usePathname();
    const [redirectUri, setRedirectUri] = useState(
        searchParams.get('redirect_uri')
    );

    useEffect(() => {
        const uri = searchParams.get('redirect_uri') || window.location.href;
        setRedirectUri(uri);
        console.log(path);
    }, [searchParams, path]);

    return (
        <Button
            data-url={apiUrl}
            variant="contained"
            color="inherit"
            href={`${apiUrl}/oauth2/login/${registration}?redirect_uri=${redirectUri}`}
            sx={{
                padding: '0',
                margin: '0',
                boxShadow: 'none',
                background: 'none',
                '&:hover': { backgroundColor: '#f1f1f1' },
            }}
        >
            <Box
                component="img"
                src={src}
                sx={{
                    width: '100%',
                    maxWidth: '35dvh',
                    height: 'auto',
                }}
            ></Box>
        </Button>
    );
};

const SnsLoginContainer = () => {
    return (
        <Box
            sx={{
                marginTop: '1.5rem',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    justifyContent: 'center',
                }}
            >
                {/* Google 로그인 */}
                <SnsLogoButton registration="google"></SnsLogoButton>

                {/* Naver 로그인 */}
                <SnsLogoButton registration="naver"></SnsLogoButton>

                {/* Kakao 로그인 */}
                <SnsLogoButton registration="kakao"></SnsLogoButton>

                {/* Apple 로그인 */}
                <SnsLogoButton registration="apple"></SnsLogoButton>
            </Box>
        </Box>
    );
};

export default SnsLoginContainer;
