'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useMemo, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    getContainerRef,
    getLayout,
} from '@/components/flexLayout/FlexLayoutContainerStore';
import { mathGrow } from '@/components/flexLayout/FlexLayoutUtils';
import { lnbOpenSubject } from '@/handler/subject/LnbSubject';
import GNBProvider from '@/components/layouts/providers/GNBProvider';
const gnbItems = [
    { label: '메뉴', icon: MenuIcon },
    { label: '검색', href: '/search', icon: SearchIcon },
    { label: '홈', href: '/', icon: HomeIcon },
    { label: 'MY', href: '/authorization/mypage', icon: AccountCircleIcon },
];
const GNB = () => {
    const pathname = usePathname(); // 현재 경로 가져오기
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // 모바일 화면 여부 판단
    const handleGnbTab = () => {
        if (pathname === '/menu') {
            return 0;
        } else if (pathname === '/search') {
            return 1;
        } else if (pathname === '/') {
            return 2;
        } else if (pathname.includes('/mypage')) {
            return 3;
        }
    };
    const initialTabIndex = useMemo(handleGnbTab, [pathname]);
    const [gnbIndex, setGnbIndex] = useState(initialTabIndex); // 하단 네비게이션 선택 상태    // 현재 경로에 따라 GNB 메뉴 활성화 상태 변경
    const firstGnbItemRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        setGnbIndex(handleGnbTab());
    }, [pathname]); // pathname이 변경될 때마다 실행

    // useEffect(() => {
    //     const subscription = getLayout('root').subscribe(layout => {
    //         if (!layout || !firstGnbItemRef.current) return;
    //         const { container } = layout,
    //             { bottom } = container;
    //         if (!bottom || !bottom.current) return;
    //         if (!isMobile) {
    //             bottom.current.dataset.prev_grow = bottom.current.dataset.grow;
    //             bottom.current.dataset.grow = '0';
    //             bottom.current.style.flex = `0 1 0%`;
    //             return;
    //         }
    //         const parentSize =
    //             bottom.current.parentElement?.clientHeight ||
    //             window.outerHeight;
    //         const newGrow = mathGrow(
    //             firstGnbItemRef.current.getBoundingClientRect().height,
    //             parentSize,
    //             Object.keys(layout).length
    //         );
    //         bottom.current.dataset.prev_grow = bottom.current.dataset.grow;
    //         bottom.current.dataset.grow = newGrow.toString();
    //         bottom.current.style.flex = `${newGrow} 1 0%`;
    //     });

    //     return () => {
    //         subscription.unsubscribe();
    //     };
    // });

    return (
        <>
            <GNBProvider
                firstGnbItemRef={firstGnbItemRef}
                isMobile={isMobile}
            />
            <BottomNavigation
                value={gnbIndex}
                sx={{
                    justifyContent: 'space-between',
                    paddingTop: '0.5dvh',
                    paddingBottom: '0.3dvh',
                    flexWrap: 'wrap',
                    '& .MuiBottomNavigationAction-root': {
                        width: '20%',
                        flex: '1 1 20%', // 20%의 비율로 설정
                        maxWidth: '5dvw', // 최대 너비 제한
                    },
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem',
                    },
                }}
                onChange={(event, newValue) => {
                    if (newValue == 0) return;
                    console.log(newValue);
                    setGnbIndex(newValue);
                }}
                showLabels
            >
                {gnbItems.map((e, i) => (
                    <BottomNavigationAction
                        key={i}
                        label={e.label}
                        icon={
                            <e.icon
                                sx={{ width: '50%', height: '50%' }}
                            ></e.icon>
                        }
                        {...(e.href
                            ? {
                                  onClick: () => {
                                      router.push(e.href);
                                  },
                              }
                            : {})}
                        {...(e.label === '메뉴'
                            ? {
                                  onClick: () => {
                                      lnbOpenSubject.next();
                                  },
                                  ref: firstGnbItemRef,
                              }
                            : {})}
                    />
                ))}
            </BottomNavigation>
        </>
    );
};

export default GNB;
