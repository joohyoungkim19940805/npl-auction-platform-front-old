'use client';
import MainContent from '@/components/MainContent';
import { Box, Button, Typography, Tab, Tabs, Alert } from '@mui/material';
import { ReactNode, Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const tabs = ['mypage', 'storagebox', 'subscriptions'];
const tabsMap = tabs.reduce(
    (t, e, i) => ({ ...t, [e]: i }),
    {} as { [key: string]: number }
);

export default function ContentTab() {
    const router = useRouter();
    const pathName = usePathname();
    const initialTabIndex = useMemo(
        () => tabsMap[pathName.split('/').pop() || ''] || 0,
        [pathName]
    );
    const [selectedTab, setSelectedTab] = useState<number>(initialTabIndex);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
        const pageName = tabs[newValue];
        const newUrl =
            pageName === 'mypage'
                ? '/authorization/mypage'
                : `/authorization/mypage/${pageName}`;

        if (newUrl !== pathName) {
            router.push(newUrl);
        }
    };
    return (
        <Box
            sx={{
                backgroundImage:
                    'linear-gradient(180deg, #f0f4f8 0%, #d9e2ec 50%, #f0f4f8 100%)',
                display: 'flex',
                width: '100%',
                position: 'sticky',
                top: 0,
            }}
        >
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: '#ffffff',
                    },
                }}
                sx={{
                    width: '100%',
                    '& .MuiTabs-flexContainer': {
                        justifyContent: 'space-around',
                    },
                    '& .MuiTab-root': {
                        color: '#a7a7a7',
                        fontWeight: 'bold',
                        '&.Mui-selected': {
                            color: '#777777',
                        },
                    },
                }}
            >
                <Tab label="마이페이지" />
                <Tab label="보관함" />
                <Tab label="구독함" />
            </Tabs>
        </Box>
    );
}
