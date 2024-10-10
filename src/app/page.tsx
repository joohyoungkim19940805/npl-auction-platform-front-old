import Image from 'next/image';
import styles from '@/app/page.module.css';
import { Box, Button, Container, Typography } from '@mui/material';
import PlanningSection from '@/components/PlanningSection';
import AuctionList from '@/components/AuctionList';
import RegionFilter from '@/components/RegionFilter';
import AuctionListWrapper from '@/components/AuctionListWrapper';

const Content = () => {
    const collaterals = [
        { title: '담보 물건 A', price: '₩500,000', date: '2024-01-15' },
        { title: '담보 물건 B', price: '₩1,000,000', date: '2024-02-15' },
        { title: '담보 물건 C', price: '₩1,000,000', date: '2024-02-15' },
        { title: '담보 물건 D', price: '₩1,000,000', date: '2024-02-15' },
        { title: '담보 물건 E', price: '₩1,000,000', date: '2024-02-15' },
        { title: '담보 물건 F', price: '₩1,000,000', date: '2024-02-15' },
    ];
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    flexWrap: 'nowrap',
                    textWrap: 'nowrap',
                    overflowWrap: 'anywhere',
                }}
            >
                {/* 담보 물건 기획전 */}
                <PlanningSection />
                <Box
                    sx={{
                        textAlign: 'center',
                        padding: '1.5rem 0',
                        backgroundColor: '#ffffff', // 흰색 배경
                    }}
                >
                    <Typography
                        variant="h5" // 적당한 크기로 설정
                        sx={{
                            fontFamily: 'serif',
                            fontWeight: 'bold',
                            color: '#1a1a1a', // 진한 회색 글자색으로 세련된 느낌
                            letterSpacing: '0.1rem', // 글자 간격을 살짝 넓게 설정
                            textTransform: 'uppercase', // 대문자로 설정해 깔끔한 느낌
                        }}
                    >
                        TOP 100
                    </Typography>
                </Box>
                {/* 정렬 및 필터 기능 */}
                <RegionFilter />
                {/* 담보 물건 목록 */}
                <AuctionListWrapper>
                    <AuctionList />
                </AuctionListWrapper>
            </Box>
        </Box>
    );
};
export default Content;
