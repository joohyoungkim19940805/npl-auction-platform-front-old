import { Button, styled } from '@mui/material';

export const BlueButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '8px',
    textTransform: 'none',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textWrapStyle: 'pretty',
    '&:hover': {
        backgroundColor: '#2563eb', // 더 어두운 색상으로 강조
        transform: 'scale(1.05)',
    },
    '&:active': {
        backgroundColor: '#1d4ed8',
    },
}));

export default BlueButton;
