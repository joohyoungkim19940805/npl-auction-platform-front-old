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
import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    getContainerRef,
    getLayout,
} from '@/components/flexLayout/FlexLayoutContainerStore';
import { mathGrow } from '@/components/flexLayout/FlexLayoutUtils';
import { lnbOpenSubject } from '@/handler/subject/LnbSubject';

const GNB = () => {
    const pathname = usePathname(); // 현재 경로 가져오기
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // 모바일 화면 여부 판단
    const [value, setValue] = useState(2); // 하단 네비게이션 선택 상태    // 현재 경로에 따라 GNB 메뉴 활성화 상태 변경
    const firstGnbItemRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (pathname === '/menu') {
            setValue(0); // 메뉴
        } else if (pathname === '/search') {
            setValue(1); // 검색
        } else if (pathname === '/') {
            setValue(2); // 홈
        } else if (pathname === '/contact') {
            setValue(3); // 고객센터
        } else if (pathname === '/mypage') {
            setValue(4); // 마이페이지
        }
    }, [pathname]); // pathname이 변경될 때마다 실행
    useEffect(() => {
        const subscription = getLayout('root').subscribe(layout => {
            if (!layout || !firstGnbItemRef.current) return;
            const { bottom } = layout;
            if (!bottom || !bottom.current) return;
            if (!isMobile) {
                bottom.current.dataset.prev_grow = bottom.current.dataset.grow;
                bottom.current.dataset.grow = '0';
                bottom.current.style.flex = `0 1 0%`;
                return;
            }
            const parentSize =
                bottom.current.parentElement?.clientHeight ||
                window.outerHeight;
            const newGrow = mathGrow(
                firstGnbItemRef.current.getBoundingClientRect().height,
                parentSize,
                Object.keys(layout).length
            );
            bottom.current.dataset.prev_grow = bottom.current.dataset.grow;
            bottom.current.dataset.grow = newGrow.toString();
            bottom.current.style.flex = `${newGrow} 1 0%`;
        });

        return () => {
            subscription.unsubscribe();
        };
    });
    return (
        <>
            <BottomNavigation
                value={value}
                sx={{
                    justifyContent: 'space-between',
                    paddingTop: '0.5dvh',
                    paddingBottom: '0.3dvh',
                    flexWrap: 'wrap',
                    '& .MuiBottomNavigationAction-root': {
                        width: '20%',
                        flex: '1 1 20%', // 20%의 비율로 설정
                        maxWidth: '5dvw', // 최대 너비 100px로 제한
                    },
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem',
                    },
                }}
                onChange={(event, newValue) => {
                    if (newValue == 0) return;
                    setValue(newValue);
                }}
                showLabels
            >
                {/* 메뉴 */}
                <BottomNavigationAction
                    label="메뉴"
                    icon={<MenuIcon sx={{ width: '50%', height: '50%' }} />}
                    onClick={() => {
                        lnbOpenSubject.next();
                    }} // 클릭 이벤트 핸들러 추가
                    ref={firstGnbItemRef}
                />
                {/* 검색 */}
                <BottomNavigationAction
                    label="검색"
                    icon={<SearchIcon sx={{ width: '50%', height: '50%' }} />}
                    component={Link}
                    href="/search" // 검색 페이지로 링크 설정
                />
                {/* 홈 */}
                <BottomNavigationAction
                    label="홈"
                    icon={<HomeIcon sx={{ width: '50%', height: '50%' }} />}
                    component={Link}
                    href="/" // 홈 페이지로 링크 설정
                />
                {/* 마이페이지 */}
                <BottomNavigationAction
                    label="MY"
                    icon={
                        <AccountCircleIcon
                            sx={{ width: '50%', height: '50%' }}
                        />
                    }
                    component={Link}
                    href="/mypage" // 마이페이지로 링크 설정
                />
            </BottomNavigation>
        </>
    );
};

export default GNB;
