'use client';
import MainContent from '@/components/MainContent';
import { Box, Button, Typography, Tab, Tabs, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import CircularChart from '@/components/chart/CircleChart';
import CircleChart from '@/components/chart/CircleChart';
import LineTitle from '@/components/typography/LineTitle';
import GrayButton from '@/components/buttons/GrayButton';
import BlueButton from '@/components/buttons/BlueButton';
import EllipsisTypography from '@/components/typography/EllipsisTypography';
const buildingTypeData = [30, 20, 50]; // 예시 데이터
const regionData = [40, 25, 35];

const buildingTypeLabels = ['주거용', '상업용', '산업용'];
const regionLabels = ['서울', '경기', '부산'];

const buildingTypeColors = [
    '#6366f1', // 라벤더 블루
    '#6ee7b7', // 민트
    '#fca5a5', // 라이트 코랄
];
/*
const buildingTypeColors = [
    '#3b82f6', // 선명한 파란색
    '#60a5fa', // 밝은 하늘색
    '#10b981', // 그린
    '#fbbf24', // 부드러운 옐로우
    '#6366f1', // 라벤더 블루
    '#6ee7b7', // 민트
    '#fca5a5', // 라이트 코랄
    '#93c5fd', // 페일 블루
    '#a5b4fc', // 연한 라벤더 블루
    '#f87171', // 부드러운 레드
    '#34d399', // 에메랄드 그린
    '#818cf8', // 퍼플 블루
];
*/
const regionColors = ['#ef4444', '#22c55e', '#a855f7'];

export default function MyPage() {
    return (
        <MainContent isPageChangeLoading={true}>
            {/* 회원 정보 섹션 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2dvh' }}>
                <Paper
                    id="section-0"
                    elevation={3}
                    sx={{
                        padding: '3rem 1.5rem 0 1.5rem',
                        borderRadius: 2,
                        backgroundColor: '#fafafa',
                    }}
                >
                    <LineTitle lineColor={'#3b82f6'}>회원정보</LineTitle>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                        mb={2}
                    >
                        <Box>
                            <Typography
                                sx={{ fontWeight: 'medium', color: '#555' }}
                            >
                                아이디: user1234
                            </Typography>
                            <Typography
                                sx={{ fontWeight: 'medium', color: '#555' }}
                            >
                                이름: 홍길동
                            </Typography>
                        </Box>
                        <BlueButton>정보 수정</BlueButton>
                    </Box>
                    <Box
                        sx={{
                            margin: '2.7rem 0 0 0',
                            display: 'flex',
                            gap: '2dvh',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button>최근 본 물건: 3개</Button>
                        <Button>좋아요: 5개</Button>
                        <Button>내 댓글: 2개</Button>
                    </Box>
                    <GrayButton
                        sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}
                        variant="contained"
                        startIcon={<LogoutIcon />}
                        fullWidth
                    >
                        로그아웃
                    </GrayButton>
                </Paper>

                {/* 통계 섹션 */}
                <Paper
                    id="section-1"
                    elevation={3}
                    sx={{
                        padding: '3rem 1.5rem 1rem 1.5rem',
                        borderRadius: 2,
                        backgroundColor: '#fafafa',
                    }}
                >
                    <LineTitle lineColor={'#3b82f6'}>통계</LineTitle>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            '& > *': {
                                width: '50%',
                                maxWidth: '20rem',
                            },
                        }}
                    >
                        <Box width="50%" p={2} textAlign="center">
                            <EllipsisTypography>
                                좋아요 - 건물 용도
                            </EllipsisTypography>
                            <CircleChart
                                dataset={buildingTypeData}
                                labels={buildingTypeLabels}
                                colors={buildingTypeColors}
                            />
                        </Box>
                        <Box width="50%" p={2} textAlign="center">
                            <EllipsisTypography>
                                최근 본 - 건물 용도
                            </EllipsisTypography>
                            <CircleChart
                                dataset={buildingTypeData}
                                labels={buildingTypeLabels}
                                colors={buildingTypeColors}
                            />
                        </Box>
                        <Box width="50%" p={2} textAlign="center">
                            <EllipsisTypography>
                                최근 본 - 건물 용도
                            </EllipsisTypography>
                            <CircleChart
                                dataset={buildingTypeData}
                                labels={buildingTypeLabels}
                                colors={buildingTypeColors}
                            />
                        </Box>
                        <Box width="50%" p={2} textAlign="center">
                            <EllipsisTypography>
                                최근 본 - 지역별
                            </EllipsisTypography>
                            <CircleChart
                                dataset={buildingTypeData}
                                labels={buildingTypeLabels}
                                colors={buildingTypeColors}
                            />
                        </Box>
                    </Box>
                </Paper>

                {/* 추천 섹션 */}
                <Paper
                    id="section-2"
                    elevation={3}
                    sx={{
                        padding: '3rem 1.5rem 1rem 1.5rem',
                        borderRadius: 2,
                        backgroundColor: '#fafafa',
                    }}
                >
                    <LineTitle lineColor={'#3b82f6'}>추천</LineTitle>

                    <Box mt={1}>
                        <EllipsisTypography variant="subtitle1">
                            좋아요 기반 추천
                        </EllipsisTypography>
                        <Box
                            bgcolor="grey.200"
                            height={60}
                            mt={1}
                            borderRadius={1}
                        />
                    </Box>
                    <Box mt={2}>
                        <EllipsisTypography variant="subtitle1">
                            최근 본 물건 기반 추천
                        </EllipsisTypography>
                        <Box
                            bgcolor="grey.200"
                            height={60}
                            mt={1}
                            borderRadius={1}
                        />
                    </Box>
                </Paper>
            </Box>
        </MainContent>
    );
}
