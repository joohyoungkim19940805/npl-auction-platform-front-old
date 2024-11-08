import { Box, Typography } from '@mui/material';
import PlanningSection from '@/components/PlanningSection';
import AuctionList from '@/components/auction/AuctionList';
import RegionFilter from '@/components/RegionFilter';
import AuctionListWrapper from '@/components/auction/AuctionListWrapper';
import YouTubeVideo from '@/components/YouTubeVideo';
import MainContent from '@/components/MainContent';

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
        <MainContent>
            {/* 담보 물건 기획전 */}
            <PlanningSection />
            <YouTubeVideo videoId="vr0ZiBAGyC0" />
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
        </MainContent>
    );
};
export default Content;
