'use client';
import { Box, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// 기획전 데이터 (이미지 및 설명)
const planningItems = [
    {
        title: '기획전 1',
        description: '부동산 기획전 1 설명입니다.',
        imageUrl:
            'https://www.nplplatform.co.kr/files/2024/10/06/49ebe6e9906f4f315f4d867d6c9d83de091958.jpg', // 이미지 경로 예시
    },
    {
        title: '기획전 2',
        description: '부동산 기획전 2 설명입니다.',
        imageUrl:
            'https://www.nplplatform.co.kr/files/2024/09/14/49ebe6e9906f4f315f4d867d6c9d83de115638.jpg',
    },
    {
        title: '기획전 3',
        description: '부동산 기획전 3 설명입니다.',
        imageUrl:
            'https://www.nplplatform.co.kr/files/2024/09/29/a6ee820dcf16f1a4e1f822ca481b7578115154.jpg',
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
    // 인덱스 클릭 시 해당 인덱스로 스크롤 이동
    const handleIndexClick = (index: number) => {
        if (!containerRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const scrollLeft = index * containerWidth;
        containerRef.current.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
        });
        setCurrentIndex(index);
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
        <Box sx={{ marginBottom: '2rem', p: 3 }}>
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
                        <Link href={`/planning/1`} passHref>
                            <Paper elevation={3} sx={{ overflow: 'hidden' }}>
                                {/* 기획전 이미지 */}
                                <Box
                                    component="img"
                                    src={item.imageUrl}
                                    alt={item.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '30dvh',
                                        objectFit: 'contain',
                                        paddingLeft: '3.5dvw',
                                        paddingRight: '3.5dvw',
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
                        </Link>
                    </Box>
                ))}
            </Box>

            {/* 현재 기획전 인덱스 표시 */}
            <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
                {planningItems.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => handleIndexClick(index)} // 클릭 시 해당 인덱스로 이동
                        sx={{
                            display: 'inline-block',
                            textAlign: 'center',
                            width: '1.5rem',
                            height: '1.5rem',
                            margin: '0 5px', // 동그라미 간격
                            borderRadius: '50%', // 동그라미 모양
                            backgroundColor:
                                index === currentIndex ? '#003366' : '#cccccc', // 현재 선택된 인덱스 강조
                            transition: 'background-color 0.3s ease', // 애니메이션 효과 추가
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default PlanningSection;
