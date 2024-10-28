import { Box, Button, Link, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // 아이콘 import 추가

const SingUpGuide = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '1rem 0',
                flexWrap: 'wrap',
                width: '100%',
            }}
        >
            <Box display="flex">
                <PersonAddIcon sx={{ marginRight: '0.5rem' }} />{' '}
                {/* 아이콘 추가 */}
                <Typography variant="body1" sx={{ fontSize: '0.8rem' }}>
                    아직 NPL Auction의 회원이 아니신가요?
                </Typography>
            </Box>
            <Button variant="contained" href="/signup" sx={{ width: '100%' }}>
                회원가입
            </Button>
        </Box>
    );
};

export default SingUpGuide;
