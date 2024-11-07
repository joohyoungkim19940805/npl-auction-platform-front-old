'use client';
import MainContent from '@/components/MainContent';
import { Box, Button, Typography, Tab, Tabs, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import CircularChart from '@/components/chart/CircleChart';
import CircleChart from '@/components/chart/CircleChart';
const buildingTypeData = [30, 20, 50]; // 예시 데이터
const regionData = [40, 25, 35];

const buildingTypeLabels = ['주거용', '상업용', '산업용'];
const regionLabels = ['서울', '경기', '부산'];

const buildingTypeColors = ['#3b82f6', '#f97316', '#10b981'];
const regionColors = ['#ef4444', '#22c55e', '#a855f7'];

export default function MyPage() {
    return (
        <MainContent isPageChangeLoading={true}>
            {/* 회원 정보 섹션 */}
            <Paper
                id="section-0"
                elevation={3}
                sx={{
                    padding: '3rem 1.5rem 0 1.5rem',
                    borderRadius: 2,
                    backgroundColor: '#fafafa',
                }}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        borderBottom: '2px solid #3b82f6', // 밑줄 추가
                        paddingBottom: 1,
                        color: '#333',
                        fontWeight: 'bold',
                    }}
                >
                    회원 정보
                </Typography>
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
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: '#3b82f6',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            textTransform: 'none',
                            transition:
                                'transform 0.2s ease, background-color 0.2s ease',
                            '&:hover': {
                                backgroundColor: '#2563eb', // 더 어두운 색상으로 강조
                                transform: 'scale(1.05)',
                            },
                            '&:active': {
                                backgroundColor: '#1d4ed8',
                            },
                        }}
                    >
                        정보 수정
                    </Button>
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
                <Button
                    variant="contained"
                    startIcon={<LogoutIcon />}
                    sx={{
                        margin: '4rem 0 2rem 0',
                        backgroundColor: '#f0f0f0', // 기본 배경색
                        color: '#333',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        transition:
                            'transform 0.2s ease, background-color 0.2s ease',
                        '&:hover': {
                            backgroundColor: '#d9534f', // 호버 시 배경색
                            color: '#ffffff',
                            transform: 'scale(1.05)',
                        },
                        '&:active': {
                            backgroundColor: '#c9302c', // 클릭 시 배경색
                        },
                    }}
                    fullWidth
                >
                    로그아웃
                </Button>
            </Paper>

            {/* 통계 섹션 */}
            <Box id="section-1" p={2} borderBottom="1px solid grey">
                <Typography variant="h6" gutterBottom>
                    통계
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        '& > *': {
                            width: '50%',
                            maxWidth: '20rem',
                        },
                    }}
                >
                    <Box width="50%" p={2} textAlign="center">
                        <Typography>좋아요 - 건물 용도</Typography>
                        <Box
                            bgcolor="grey.300"
                            height={100}
                            mt={1}
                            borderRadius="50%"
                        />
                    </Box>
                    <Box width="50%" p={2} textAlign="center">
                        <Typography>최근 본 - 건물 용도</Typography>
                        <CircleChart
                            dataset={buildingTypeData}
                            labels={buildingTypeLabels}
                            colors={buildingTypeColors}
                        />
                    </Box>
                    <Box width="50%" p={2} textAlign="center">
                        <Typography>최근 본 - 건물 용도</Typography>
                        <Box
                            bgcolor="grey.300"
                            height={100}
                            mt={1}
                            borderRadius="50%"
                        />
                    </Box>
                    <Box width="50%" p={2} textAlign="center">
                        <Typography>최근 본 - 지역별</Typography>
                        <Box
                            bgcolor="grey.300"
                            height={100}
                            mt={1}
                            borderRadius="50%"
                        />
                    </Box>
                </Box>
            </Box>

            {/* 추천 섹션 */}
            <Box id="section-2" p={2}>
                <Typography variant="h6" gutterBottom>
                    추천
                </Typography>
                <Box mt={1}>
                    <Typography variant="subtitle1">
                        좋아요 기반 추천
                    </Typography>
                    <Box
                        bgcolor="grey.200"
                        height={60}
                        mt={1}
                        borderRadius={1}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="subtitle1">
                        최근 본 물건 기반 추천
                    </Typography>
                    <Box
                        bgcolor="grey.200"
                        height={60}
                        mt={1}
                        borderRadius={1}
                    />
                </Box>
            </Box>
        </MainContent>
    );
}
