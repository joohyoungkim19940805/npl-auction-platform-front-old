import { styled, Typography } from '@mui/material';

export const EllipsisTypography = styled(Typography)(({ theme }) => ({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    letterSpacing: '0.05rem',
    paddingBottom: 1,
    marginBottom: '0.3rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: '1rem', // 기본 글꼴 크기 설정
    transition: 'color 0.3s ease', // 색상 변화 애니메이션
    '&:hover': {
        color: theme.palette.primary.main, // 호버 시 주요 색상으로 변경
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem', // 작은 화면에서 글꼴 크기 줄이기
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.125rem', // 큰 화면에서 글꼴 크기 늘리기
    },
}));

export default EllipsisTypography;
