import { AuctionItem } from '@/components/auction/@types/AuctionItemType';
import AuctionItemMore from '@/components/auction/AuctionItemMore';
import AuctionTimer from '@/components/auction/AuctionTimer';
import LikeButton from '@/components/LikeButton';
import { calculateTimeLeft } from '@/handler/AuctionTimer';
import { Paper, Typography, Box, Grid2 } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const collaterals: AuctionItem[] = [
    {
        title: '담보 물건 A',
        assessmentAmount: 500000,
        estimatedAmount: 500000 - 500,
        protectionAmount: 500000 / 10,
        loanAmount: 500000 - 500,
        mortgageAmount: 500000 - 500,
        endDate: '2024-10-10T15:35:55',
        representativeImageUrl:
            'http://img.redauction.co.kr/imgproxy/iproxy.php?imgurl=http%3A%2F%2Fwww.courtauction.go.kr%2FDownFront%3Fspec%3Ddefault%26dir%3Dkp%2F2023%2F0727%26filename%3DB000211202301300021014.jpg%26downloadfilename%3DB000211202301300021014.jpg&hash=f6bd0bffd586c1526249fd51cdae02a7',
        id: 1,
    },
    {
        title: '담보 물건 B',
        assessmentAmount: 1000000000000,
        estimatedAmount: 500000 - 500,
        protectionAmount: 500000 / 10,
        loanAmount: 500000 - 500,
        mortgageAmount: 500000 - 500,
        endDate: '2024-10-12T15:15:15',
        representativeImageUrl:
            'http://img.redauction.co.kr/imgproxy/iproxy.php?imgurl=http%3A%2F%2Fwww.courtauction.go.kr%2FDownFront%3Fspec%3Ddefault%26dir%3Dkp%2F2023%2F0727%26filename%3DB000211202301300021014.jpg%26downloadfilename%3DB000211202301300021014.jpg&hash=f6bd0bffd586c1526249fd51cdae02a7',
        id: 1,
    },
    {
        title: '담보 물건 C',
        assessmentAmount: 10000000,
        estimatedAmount: 500000 - 500,
        protectionAmount: 500000 / 10,
        loanAmount: 500000 - 500,
        mortgageAmount: 500000 - 500,
        endDate: '2024-10-12T19:19:17',
        representativeImageUrl:
            'http://img.redauction.co.kr/imgproxy/iproxy.php?imgurl=http%3A%2F%2Fwww.courtauction.go.kr%2FDownFront%3Fspec%3Ddefault%26dir%3Dkp%2F2023%2F0727%26filename%3DB000211202301300021014.jpg%26downloadfilename%3DB000211202301300021014.jpg&hash=f6bd0bffd586c1526249fd51cdae02a7',
        id: 1,
    },
    {
        title: '담보 물건 D',
        assessmentAmount: 100000000,
        estimatedAmount: 500000 - 500,
        protectionAmount: 500000 / 10,
        loanAmount: 500000 - 500,
        mortgageAmount: 500000 - 500,
        endDate: '2024-10-13T15:15:15',
        representativeImageUrl:
            'http://img.redauction.co.kr/imgproxy/iproxy.php?imgurl=http%3A%2F%2Fwww.courtauction.go.kr%2FDownFront%3Fspec%3Ddefault%26dir%3Dkp%2F2023%2F0727%26filename%3DB000211202301300021014.jpg%26downloadfilename%3DB000211202301300021014.jpg&hash=f6bd0bffd586c1526249fd51cdae02a7',
        id: 1,
    },
    {
        title: '담보 물건 E',
        assessmentAmount: 1000000000,
        estimatedAmount: 500000 - 500,
        protectionAmount: 500000 / 10,
        loanAmount: 500000 - 500,
        mortgageAmount: 500000 - 500,
        endDate: '2024-10-13T19:19:17',
        representativeImageUrl:
            'http://img.redauction.co.kr/imgproxy/iproxy.php?imgurl=http%3A%2F%2Fwww.courtauction.go.kr%2FDownFront%3Fspec%3Ddefault%26dir%3Dkp%2F2023%2F0727%26filename%3DB000211202301300021014.jpg%26downloadfilename%3DB000211202301300021014.jpg&hash=f6bd0bffd586c1526249fd51cdae02a7',
        id: 1,
    },
    {
        title: '담보 물건 F',
        assessmentAmount: 10000000000,
        estimatedAmount: 500000 - 500,
        protectionAmount: 500000 / 10,
        loanAmount: 500000 - 500,
        mortgageAmount: 500000 - 500,
        endDate: '2024-10-14T11:12:17',
        representativeImageUrl:
            'http://img.redauction.co.kr/imgproxy/iproxy.php?imgurl=http%3A%2F%2Fwww.courtauction.go.kr%2FDownFront%3Fspec%3Ddefault%26dir%3Dkp%2F2023%2F0727%26filename%3DB000211202301300021014.jpg%26downloadfilename%3DB000211202301300021014.jpg&hash=f6bd0bffd586c1526249fd51cdae02a7',
        id: 1,
    },
    {
        title: '담보 물건 G',
        assessmentAmount: 10000000000,
        estimatedAmount: 500000 - 500,
        protectionAmount: 500000 / 10,
        loanAmount: 500000 - 500,
        mortgageAmount: 500000 - 500,
        endDate: '2024-10-10T11:12:17',
        representativeImageUrl:
            'http://img.redauction.co.kr/imgproxy/iproxy.php?imgurl=http%3A%2F%2Fwww.courtauction.go.kr%2FDownFront%3Fspec%3Ddefault%26dir%3Dkp%2F2023%2F0727%26filename%3DB000211202301300021014.jpg%26downloadfilename%3DB000211202301300021014.jpg&hash=f6bd0bffd586c1526249fd51cdae02a7',
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
                <Grid2 sx={{ position: 'relative' }} key={index}>
                    {!item ? (
                        <span></span>
                    ) : (
                        <>
                            <Link href={`/auction/${item.id}`} passHref>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        padding: '0.8rem',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '30dvw',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            paddingLeft: '3.5dvw',
                                            paddingRight: '3.5dvw',
                                        }}
                                    >
                                        <Image
                                            src={item.representativeImageUrl}
                                            alt={item.title}
                                            layout="fill"
                                            loading="lazy"
                                            fill={true}
                                            objectFit="contain"
                                        />
                                        {/*<Box
                                            component="img"
                                            src={item.representativeImageUrl}
                                            alt={item.title}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'scale-down',
                                            }}
                                        />*/}
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
                                            variant="body2"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            평가액{' '}
                                            {item.assessmentAmount.toLocaleString()}
                                            원
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
                                            overflow: 'hidden',
                                            '& p': {
                                                fontSize: '0.85rem', // 글자 크기 살짝 작게 설정
                                            },
                                            '& svg': {
                                                width: '0.9rem',
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
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
                            <AuctionItemMore {...item} />
                            {/* 왼쪽 상단에 좋아요 버튼 배치 */}
                            <LikeButton
                                initialLiked={false}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    padding: '0.65rem',
                                }}
                                id={item.id}
                            />
                        </>
                    )}
                </Grid2>
            ))}
        </>
    );
};

export default AuctionList;
