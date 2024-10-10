'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { Box } from '@mui/material';
import {
    getContainerRef,
    getLayoutRef,
} from '@/components/flexLayout/FlexLayoutContainerStore';
import {
    closeFlex,
    mathGrow,
    openFlex,
} from '@/components/flexLayout/FlexLayoutUtils';

export type HeaderProps = {
    isSsrMobile: boolean;
};

const Header = ({ isSsrMobile }: HeaderProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
        defaultMatches: isSsrMobile,
    }); // 모바일 화면 여부 판단
    const headerRef = useRef<HTMLDivElement>(null);
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
    const [containers, setContainers] = useState<HTMLElement[]>([]);
    const [lnbContainer, setLnbContainer] = useState<HTMLElement>();

    useEffect(() => {
        // 특정 layoutName과 containerName을 통해 ref를 구독
        const subscription = getLayoutRef('main').subscribe(ref => {
            if (ref) {
                if (!ref['lnb'].current) return;
                setContainers(
                    Object.values(ref)
                        .filter(
                            (e): e is { current: HTMLElement } =>
                                e.current !== null
                        )
                        .map(e => e.current)
                );
                setLnbContainer(ref['lnb'].current);
            }
        });
        // 구독 해제
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (!lnbContainer) return;
        if (isOpenSidebar) {
            openFlex(lnbContainer, containers, {
                openGrowImportant: mathGrow(
                    parseInt(window.getComputedStyle(lnbContainer).maxWidth),
                    lnbContainer.parentElement?.clientWidth ||
                        window.outerWidth,
                    containers.length
                ),
            });
        } else {
            closeFlex(lnbContainer, containers);
        }
    }, [isOpenSidebar, lnbContainer, containers]);

    const toggleSidebar = () =>
        setIsOpenSidebar(prevIsOpenSidebar => !prevIsOpenSidebar);

    return (
        <>
            <AppBar
                position="relative"
                sx={{
                    /*backgroundColor: '#00274d',*/
                    backgroundImage: 'linear-gradient(90deg, #003366, #285a85)',
                    borderBottom: 'none',
                    boxShadow: 'none',
                    '& > *': {
                        padding: 0,
                        minHeight: 0,
                    },
                }}
                ref={headerRef}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        width: 'inherit',
                        height: 'inherit',
                        padding: '0 !important', // padding을 0으로 설정
                        minHeight: '0 !important', // minHeight를 0으로 설정
                    }}
                >
                    {/* 메뉴 열기 버튼 (모바일 및 PC 공통) */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleSidebar}
                        sx={{ pl: 3 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* NPL Platform 로고 */}
                    <Typography
                        variant="h6"
                        component={Link}
                        href="/"
                        sx={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontFamily: 'serif',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)', // 완전한 중앙 배치
                        }}
                    >
                        NPL Platform
                    </Typography>

                    {/* PC 버전에서만 표시되는 로그인, 회원가입, 고객센터 버튼 */}
                    {!isMobile && (
                        <Box
                            sx={{
                                textTransform: 'none',
                                fontFamily: 'serif',
                                color: '#ffffff',
                            }}
                        >
                            <Button
                                color="inherit"
                                component={Link}
                                href="/login"
                            >
                                로그인
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                href="/register"
                            >
                                회원가입
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                href="/contact"
                            >
                                고객센터
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
