'use client';
import MainContent from '@/components/MainContent';
import { Box, Button, Typography, Tab, Tabs, Alert } from '@mui/material';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const subTabs = {
    mypage: [],
};

export default function SubContentTab() {
    const router = useRouter();
    const pathName = usePathname();

    const [selectedSubTab, setSelectedSubTab] = useState<number>(0);
    return (
        <Box
            position="sticky"
            sx={{
                top: 0,
            }}
        >
            <Tabs
                value={selectedSubTab}
                onChange={(e, newValue) => setSelectedSubTab(newValue)}
                sx={{
                    '& .MuiTabs-flexContainer': {
                        justifyContent: 'space-around',
                    },
                }}
            >
                <Tab label="회원 정보" component={Link} href={'#section-0'} />
                <Tab label="통계" component={Link} href={'#section-1'} />
                <Tab label="추천" component={Link} href={'#section-2'} />
            </Tabs>
        </Box>
    );
}
