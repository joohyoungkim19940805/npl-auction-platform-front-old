import { Button, styled } from '@mui/material';

export const GrayButton = styled(Button)(({ theme }) => ({
    margin: '4rem 0 2rem 0',
    backgroundColor: '#f0f0f0', // 기본 배경색
    color: '#333',
    padding: '8px 16px',
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 'bold',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
    '&:hover': {
        backgroundColor: '#d9534f', // 호버 시 배경색
        color: '#ffffff',
        transform: 'scale(1.05)',
    },
    '&:active': {
        backgroundColor: '#c9302c', // 클릭 시 배경색
    },
}));
export default GrayButton;
