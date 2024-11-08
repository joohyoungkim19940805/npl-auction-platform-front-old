'use client';
import MainContent from '@/components/MainContent';
import { Box, Button, Typography, Tab, Tabs, Alert } from '@mui/material';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { TabItem } from '@/components/tapbar/TabBar';

const subTabs = {
    mypage: [],
};

export default function MyPageSubTab({ subTabs }: { subTabs: TabItem[] }) {
    const [selectedSubTab, setSelectedSubTab] = useState<number>(0);

    return (
        <Box sx={{ backgroundColor: 'white' }}>
            <Tabs
                value={selectedSubTab}
                onChange={(e, newValue) => setSelectedSubTab(newValue)}
                sx={{
                    '& .MuiTabs-flexContainer': {
                        justifyContent: 'space-around',
                    },
                }}
            >
                {subTabs.map((subTab: TabItem, index) => (
                    <Tab
                        key={index}
                        label={subTab.pageName}
                        component={Link}
                        href={subTab.url}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
