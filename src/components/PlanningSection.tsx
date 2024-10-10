'use client';
import { Box, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

// 기획전 데이터 (이미지 및 설명)
const planningItems = [
    {
        title: '기획전 1',
        description: '부동산 기획전 1 설명입니다.',
        imageUrl: '/images/real-estate-1.jpg', // 이미지 경로 예시
    },
    {
        title: '기획전 2',
        description: '부동산 기획전 2 설명입니다.',
        imageUrl: '/images/real-estate-2.jpg',
    },
    {
        title: '기획전 3',
        description: '부동산 기획전 3 설명입니다.',
        imageUrl: '/images/real-estate-3.jpg',
    },
];

const PlanningSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보이는 기획전 인덱스
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
    // 스크롤 이벤트 처리
    const handleWheel = (ev: WheelEvent) => {
        if (!containerRef.current) return;
        ev.preventDefault();
        containerRef.current.scrollLeft +=
            Math.sign(ev.deltaY) * containerRef.current.clientWidth;
    };
    const handleScroll = (ev: WheelEvent | Event) => {
        if (!containerRef.current) return;

        const scrollPosition = containerRef.current.scrollLeft; // 가로 스크롤 위치
        const containerWidth = containerRef.current.clientWidth;

        const newIndex = Math.round(scrollPosition / containerWidth);
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, {
                passive: false,
            });
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('wheel', handleWheel);
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <Box sx={{ marginBottom: '2rem' }}>
            {/* 스크롤 가능한 컨테이너 */}
            <Box
                ref={containerRef}
                sx={{
                    display: 'flex',
                    overflowX: 'scroll',
                    scrollSnapType: 'both mandatory',
                    scrollBehavior: 'smooth', // 스크롤 이동 애니메이션 적용
                    gap: '0.7rem',
                    padding: '1rem',
                    '&::-webkit-scrollbar': {
                        display: 'none', // 스크롤바 숨김 (필요 시)
                    },
                }}
            >
                {planningItems.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: '100%',
                            scrollSnapAlign: 'start',
                            flexShrink: 0,
                        }}
                    >
                        <Paper elevation={3} sx={{ overflow: 'hidden' }}>
                            {/* 기획전 이미지 */}
                            <Box
                                component="img"
                                src={item.imageUrl}
                                alt={item.title}
                                sx={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover',
                                }}
                            />
                            {/* 기획전 제목 및 설명 */}
                            <Box sx={{ padding: '1rem' }}>
                                <Typography variant="h6">
                                    {item.title}
                                </Typography>
                                <Typography variant="body1">
                                    {item.description}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                ))}
            </Box>

            {/* 현재 기획전 인덱스 표시 */}
            <Typography variant="body2" sx={{ marginTop: '1rem' }}>
                현재 기획전: {currentIndex + 1} / {planningItems.length}
            </Typography>
        </Box>
    );
};

export default PlanningSection;
