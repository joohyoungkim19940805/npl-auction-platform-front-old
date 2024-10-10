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
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

const GNB = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // 모바일 화면 여부 판단
    const [value, setValue] = useState(0); // 하단 네비게이션 선택 상태

    return (
        <>
            {/* 모바일에서는 하단 GNB 표시 */}
            {true && (
                <BottomNavigation
                    value={value}
                    sx={{
                        justifyContent: 'space-around',
                        paddingTop: '1dvh',
                        paddingBottom: '0.8dvh',
                        '& .MuiBottomNavigationAction-label': {
                            fontSize: '0.9 rem',
                        },
                    }}
                    onChange={(event, newValue) => setValue(newValue)}
                    showLabels
                >
                    <BottomNavigationAction
                        label="홈"
                        icon={
                            <HomeIcon
                                sx={{ width: '1.5rem', height: '1.5rem' }}
                            />
                        }
                        component={Link}
                        href="/"
                    />
                    <BottomNavigationAction
                        label="내 계정"
                        icon={
                            <AccountCircleIcon
                                sx={{ width: '1.5rem', height: '1.5rem' }}
                            />
                        }
                        component={Link}
                        href="/login"
                    />
                    <BottomNavigationAction
                        label="고객센터"
                        icon={
                            <ContactSupportIcon
                                sx={{ width: '1.5rem', height: '1.5rem' }}
                            />
                        }
                        component={Link}
                        href="/contact"
                    />
                </BottomNavigation>
            )}
        </>
    );
};

export default GNB;
