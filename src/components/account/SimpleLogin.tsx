import { Box, Button, Link, Typography } from '@mui/material';
import { LoginInputFields } from './LoginInputFields'; // 분리한 컴포넌트 가져오기
import SnsLoginContainer from '@/components/account/SnsLogin';
import SingUpGuide from '@/components/account/SingUpGuide';

const SimpleLogin = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: 'none',
                padding: '1rem',
            }}
        >
            {/* 분리한 입력 필드 사용 */}
            <LoginInputFields />
            {/* 회원가입 안내 문구 */}
            <SingUpGuide></SingUpGuide>

            {/* 비밀번호/아이디 찾기 */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    flexWrap: 'wrap',
                    marginTop: '0.5dvh',
                    gap: '1dvh',
                }}
            >
                <Link href="/find-id" underline="hover">
                    아이디 찾기
                </Link>
                <Link href="/find-password" underline="hover">
                    비밀번호 찾기
                </Link>
            </Box>
            <SnsLoginContainer></SnsLoginContainer>
        </Box>
    );
};

export default SimpleLogin;
