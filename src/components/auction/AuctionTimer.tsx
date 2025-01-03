'use client';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // 시간 아이콘 import
import { calculateTimeLeft, TimeLeft } from '@/handler/AuctionTimer';

const AuctionTimer = ({
    endDate,
    initialTimeLeft,
}: {
    endDate: string;
    initialTimeLeft: TimeLeft;
}) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft);
    useEffect(() => {
        setTimeLeft(calculateTimeLeft(endDate));
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(endDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            {/* 남은 시간 */}
            {timeLeft.expired ? (
                <Typography variant="body2" color="error">
                    입찰 종료
                </Typography>
            ) : (
                <>
                    <AccessTimeIcon
                        fontSize="small"
                        sx={{ marginRight: '0.07rem' }}
                    />{' '}
                    {/* 시간 아이콘 추가 */}
                    <Typography variant="body2">
                        {timeLeft.days !== undefined &&
                            `${timeLeft.days}일 ${timeLeft.hours}시간`}
                        {timeLeft.hours !== undefined &&
                            timeLeft.days === undefined &&
                            `${timeLeft.hours}시간 ${timeLeft.minutes}분`}
                        {timeLeft.minutes !== undefined &&
                            timeLeft.hours === undefined &&
                            `${timeLeft.minutes}분 ${timeLeft.seconds}초`}
                        {timeLeft.seconds !== undefined &&
                            timeLeft.minutes === undefined &&
                            `${timeLeft.seconds}초`}
                    </Typography>
                </>
            )}
        </Box>
    );
};
export default AuctionTimer;
