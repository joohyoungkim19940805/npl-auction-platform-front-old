'use client';
import MainContent from '@/components/MainContent';
import { Box, Button, Typography, Tab, Tabs, Alert } from '@mui/material';
import { ReactNode, Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { TabBar, TabBarWrapper, TabItem } from '@/components/tapbar/TabBar';
import MyPageSubTab from '@/components/account/mypage/MyPageSubTab';

export default function MyPageTab({ tabs }: { tabs: TabItem[] }) {
    const router = useRouter();
    const pathName = usePathname();
    const tabsMap = useMemo(
        () =>
            tabs.reduce(
                (acc, tab, index) => ({ ...acc, [tab.url]: index }),
                {} as { [key: string]: number }
            ),
        [tabs]
    );

    const initialTabIndex = useMemo(
        () => tabsMap[pathName] || 0,
        [pathName, tabsMap]
    );
    const [selectedTab, setSelectedTab] = useState<number>(initialTabIndex);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
        const { url } = tabs[newValue];
        if (url !== pathName) {
            router.push(url);
        }
    };

    return (
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <TabBarWrapper>
                <TabBar
                    value={selectedTab}
                    onChange={handleTabChange}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: '#ffffff',
                        },
                    }}
                >
                    {tabs.map((tab: TabItem, index) => (
                        <Tab key={index} label={tab.pageName} />
                    ))}
                </TabBar>
            </TabBarWrapper>
            {/* 여기에 MyPageSubTab.tsx가 위치 */}
            {/* 선택된 Tab에 따라 SubContentTab에 해당 서브탭을 전달 */}
            <MyPageSubTab subTabs={tabs[selectedTab]?.subTabs || []} />
        </Box>
    );
}
