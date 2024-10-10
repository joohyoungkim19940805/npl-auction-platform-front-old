import AuctionTimer from '@/components/AuctionTimer';
import { calculateTimeLeft } from '@/handler/AuctionTimer';
import { Paper, Typography, Box, Grid2 } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
type Collateral = {
    title: string;
    price: number;
    endDate: string;
    id: number;
} | null;

const collaterals: Collateral[] = [
    {
        title: '담보 물건 A',
        price: 500000,
        endDate: '2024-10-10T15:35:55',
        id: 1,
    },
    {
        title: '담보 물건 B',
        price: 1000000000000,
        endDate: '2024-10-12T15:15:15',
        id: 1,
    },
    {
        title: '담보 물건 C',
        price: 10000000,
        endDate: '2024-10-12T19:19:17',
        id: 1,
    },
    {
        title: '담보 물건 D',
        price: 100000000,
        endDate: '2024-10-13T15:15:15',
        id: 1,
    },
    {
        title: '담보 물건 E',
        price: 1000000000,
        endDate: '2024-10-13T19:19:17',
        id: 1,
    },
    {
        title: '담보 물건 F',
        price: 10000000000,
        endDate: '2024-10-14T11:12:17',
        id: 1,
    },
    {
        title: '담보 물건 G',
        price: 10000000000,
        endDate: '2024-10-10T11:12:17',
        id: 1,
    },
];

const AuctionList = () => {
    if (collaterals.length % 2 !== 0) {
        collaterals.push(null);
    }
    return (
        <>
            {collaterals.map((item, index) => (
                <Grid2 sx={{}} key={index}>
                    {!item ? (
                        <span></span>
                    ) : (
                        <Link href={`/auction/${item.id}`} passHref>
                            <Paper
                                elevation={3}
                                sx={{ padding: '0.8rem', textAlign: 'center' }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '10dvh',
                                        overflow: 'hidden',
                                        position: 'relative',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={''}
                                        alt={item.title}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        padding: '0.5rem 0',
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {item.price.toLocaleString()}원
                                    </Typography>
                                </Box>
                                {/* 입찰 횟수와 남은 시간을 한 줄로 표현 */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center', // 가운데 정렬
                                        alignItems: 'center', // 수직 정렬
                                        padding: '0 2dvw', // 좌우 패딩 dvw 단위로 설정
                                        flexDirection: 'column',
                                        '& p': {
                                            fontSize: '0.85rem', // 글자 크기 살짝 작게 설정
                                        },
                                        '& svg': {
                                            width: '0.9rem',
                                        },
                                    }}
                                >
                                    <Typography variant="body2">
                                        입찰 {'47회'}
                                    </Typography>
                                    {/* 구분선 */}
                                    {/* <Typography
                                variant="body2"
                                sx={{ padding: '0 1.1dvw' }}
                            >
                                |
                            </Typography> */}
                                    <AuctionTimer
                                        endDate={item.endDate}
                                        initialTimeLeft={calculateTimeLeft(
                                            item.endDate
                                        )}
                                    ></AuctionTimer>
                                </Box>
                            </Paper>
                        </Link>
                    )}
                </Grid2>
            ))}
        </>
    );
};

export default AuctionList;
