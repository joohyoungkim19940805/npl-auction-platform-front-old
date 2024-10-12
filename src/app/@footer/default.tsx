import Footer from '@/components/layouts/Footer';
import FooterWrapper from '@/components/layouts/FooterWrapper';
import { Box, Typography, Link as MuiLink, Divider } from '@mui/material';
import { headers } from 'next/headers'; // headers 함수 사용

const Default = () => {
    const userAgent = headers().get('user-agent') || '';

    // 정규식을 통해 User-Agent에서 모바일 기기 확인
    const isSsrMobile =
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
            userAgent
        );
    return (
        <FooterWrapper isSsrMobile={isSsrMobile}>
            <Footer></Footer>
        </FooterWrapper>
    );
};
export default Default;
