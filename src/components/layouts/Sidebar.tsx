import Favorite from '@mui/icons-material/Favorite';
import Gavel from '@mui/icons-material/Gavel';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import { Avatar, Box, ListItemIcon, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { textAlign } from '@mui/system';
import Link from 'next/link';

const Sidebar = (prop: any) => {
    let profileImage = undefined;
    return (
        <Drawer
            anchor="left"
            variant="permanent"
            sx={{
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    overflow: 'hidden',
                    height: '100%',
                    width: '100%',
                    position: 'static',
                    boxSizing: 'border-box',
                    /*backgroundColor: '#00274d',*/
                    backgroundImage:
                        'linear-gradient(180deg, #003366, #285a85)',
                    color: '#ffffff',
                },
            }}
        >
            {/* 사용자 정보 */}
            <Box
                sx={{
                    padding: '2rem',
                    textAlign: 'center',
                    textWrap: 'nowrap',
                    width: 'fit-content',
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: profileImage ? 'transparent' : '#ffffff',
                        color: profileImage ? 'transparent' : '#00274d',
                        margin: 'auto',
                        width: 64,
                        height: 64,
                    }}
                    src={profileImage || undefined} // 프로필 이미지가 있으면 src에 이미지 경로를 추가
                    alt={`${'홍길동'}님의 프로필`}
                >
                    {/* 프로필 이미지가 없을 때만 첫 글자 표시 */}
                    {!profileImage && '홍길동'.toUpperCase()}
                </Avatar>
                <Typography variant="h6" sx={{ marginTop: '1rem' }}>
                    {'홍길동'}님 환영합니다
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                    좋아요한 담보 물건: {5}개
                </Typography>
                {/* 마이페이지 링크 */}
                <Typography
                    variant="body2"
                    component={Link}
                    href="/mypage"
                    sx={{
                        marginTop: '0.5rem',
                        color: '#ffffff',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        textAlign: 'center',
                    }}
                >
                    마이페이지
                </Typography>
            </Box>

            {/* 메뉴 목록 */}
            <List sx={{ textWrap: 'nowrap' }}>
                <ListItem component={Link} href="/auction">
                    <ListItemIcon sx={{ color: '#ffffff' }}>
                        <Gavel />
                    </ListItemIcon>
                    <ListItemText primary="경매 정보" />
                </ListItem>

                <ListItem component={Link} href="/planning">
                    <ListItemIcon sx={{ color: '#ffffff' }}>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="기획전" />
                </ListItem>

                <ListItem component={Link} href="/mypage">
                    <ListItemIcon sx={{ color: '#ffffff' }}>
                        <Person />
                    </ListItemIcon>
                    <ListItemText primary="마이페이지" />
                </ListItem>

                <ListItem component={Link} href="/favorites">
                    <ListItemIcon sx={{ color: '#ffffff' }}>
                        <Favorite />
                    </ListItemIcon>
                    <ListItemText primary="좋아하는 담보물" />
                </ListItem>
            </List>
        </Drawer>
    );
};
export default Sidebar;
