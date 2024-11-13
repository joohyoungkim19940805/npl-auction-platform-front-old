'use client';
import MainContent from '@/components/MainContent';
import { Box, Button, Typography, Tab, Tabs, Alert } from '@mui/material';
import { ReactNode, Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { TabItem } from '@/components/tapbar/TabBar';
import { useHash } from '@/handler/hooks/HashHooks';

export default function MyPageSubTab({ subTabs }: { subTabs: TabItem[] }) {
    const router = useRouter();
    const pathName = usePathname();
    const tabsMap = useMemo(
        () =>
            subTabs.reduce(
                (acc, tab, index) => ({ ...acc, [tab.url]: index }),
                {} as { [key: string]: number }
            ),
        [subTabs]
    );

    const [hash, setHash] = useHash();
    const initialTabIndex = useMemo(() => tabsMap[hash] || 0, [hash, tabsMap]);

    const [selectedSubTab, setSelectedSubTab] = useState<number | null>(null);

    // 클라이언트에서만 `selectedSubTab` 초기화
    useEffect(() => {
        const index =
            selectedSubTab == 0 || selectedSubTab
                ? selectedSubTab
                : initialTabIndex;
        setSelectedSubTab(index);
        setHash(subTabs[index]?.url);
    }, [initialTabIndex, setHash, subTabs, selectedSubTab]);

    if (selectedSubTab === null) return null; // 서버에서는 아무것도 렌더링하지 않음

    return (
        <Box sx={{ backgroundColor: 'white' }}>
            <Tabs
                value={selectedSubTab}
                sx={{
                    '& .MuiTabs-flexContainer': {
                        justifyContent: 'space-around',
                    },
                }}
                onChange={(e, newValue) => setSelectedSubTab(newValue)}
            >
                {subTabs.map((subTab: TabItem, index) => (
                    <Tab
                        key={index}
                        label={subTab.pageName}
                        component={Link}
                        href={subTab.url}
                        ref={() => {
                            console.log('hash', hash);
                            if (!hash || hash !== subTab.url) return;

                            let targetNode = (window as any)[
                                subTab.url.replace('#', '')
                            ];

                            if (!targetNode) return;

                            (targetNode as HTMLElement).scrollIntoView({
                                block: 'start',
                                inline: 'start',
                                behavior: 'smooth',
                            });
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
