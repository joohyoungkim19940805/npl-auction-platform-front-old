'use client';
import { oneTwoWaySubject } from '@/handler/subject/ListWaySubject';
import { Paper, Typography, Box, Grid2 } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
const collaterals = [
    { title: '담보 물건 A', price: '₩500,000', date: '2024-01-15' },
    { title: '담보 물건 B', price: '₩1,000,000', date: '2024-02-15' },
    { title: '담보 물건 C', price: '₩1,000,000', date: '2024-02-15' },
    { title: '담보 물건 D', price: '₩1,000,000', date: '2024-02-15' },
    { title: '담보 물건 E', price: '₩1,000,000', date: '2024-02-15' },
    { title: '담보 물건 F', price: '₩1,000,000', date: '2024-02-15' },
];

const AuctionListWrapper = ({ children }: { children: ReactNode }) => {
    const [isTwoColumnView, setIsTwoColumnView] = useState<boolean>(false);
    useEffect(() => {
        const subscribe = oneTwoWaySubject.subscribe(isTwoWay => {
            setIsTwoColumnView(isTwoWay);
        });
        return () => {
            subscribe.unsubscribe();
        };
    }, []);
    return (
        <Grid2
            container
            spacing={2}
            sx={{
                justifyContent: 'center',
                '& > .MuiGrid2-root': {
                    flexBasis: isTwoColumnView ? '45%' : '100%', // 자식 요소들의 width 제어
                },
            }}
        >
            {children}
        </Grid2>
    );
};

export default AuctionListWrapper;
