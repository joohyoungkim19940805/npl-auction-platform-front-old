import { Box, TextField } from '@mui/material';

export const LoginInputFields = () => {
    return (
        <Box
            component={'form'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '100%',
                color: '#ffffff',
            }}
        >
            {/* 아이디 입력 필드 */}
            <TextField
                label="아이디"
                variant="outlined"
                fullWidth
                sx={{
                    '& label, & input': {
                        color: '#1976d2',
                    },
                }}
            />
            {/* 비밀번호 입력 필드 */}
            <TextField
                label="비밀번호"
                type="password"
                variant="outlined"
                fullWidth
                sx={{
                    '& label, & input': {
                        color: '#1976d2',
                    },
                }}
            />
        </Box>
    );
};
