import SidebarProvider from '@/components/providers/SidebarProvider';
import Favorite from '@mui/icons-material/Favorite';
import Gavel from '@mui/icons-material/Gavel';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Avatar, Box, Button, ListItemIcon, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { textAlign } from '@mui/system';
import Link from 'next/link';
import RibbonBanner from '@/components/RibbonBanner';
import SimpleUserProfile from '@/components/account/UserSimpleProfile';
import SimpleLogin from '@/components/account/SimpleLogin';

import { firstValueFrom, catchError, of } from 'rxjs';
import { callApi } from '@/handler/service/CommonService';
import { AccountType } from '@/type/service/AccountType';
import { ResponseWrapper } from '@/type/ReesponseWrapper';
import { cookies } from 'next/headers';
// 서버에서 외부 API 호출
async function getAccountInfo(): Promise<ResponseWrapper<AccountType> | null> {
    const cookieStore = cookies();
    const authToken = cookieStore.get('Authorization')?.value;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/account/search/get-info`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken || '',
            },
        }
    );

    if (!res.ok) {
        return null;
    }
    return res.json();
}

const Sidebar = async ({
    activeIndex,
    isSsrMobile,
}: {
    activeIndex: number;
    isSsrMobile: boolean;
}) => {
    const wrapper = await getAccountInfo();
    const userInfo = wrapper?.data;
    const isLogin = wrapper != null && userInfo != undefined;
    console.log(userInfo);
    /*
    const { isLogin, setIsFetch } = useIsLogin();

    useEffect(() => {
        setIsFetch(true);
    }, []);
    */
    return (
        <>
            <SidebarProvider isSsrMobile={isSsrMobile} />
            <Drawer
                anchor="left"
                variant="permanent"
                sx={{
                    flexShrink: 0,
                    position: 'relative',
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
                {(isLogin && (
                    <SimpleUserProfile {...userInfo}></SimpleUserProfile>
                )) || <SimpleLogin></SimpleLogin>}

                {/* 메뉴 목록 */}
                <List sx={{ textWrap: 'nowrap', overflowY: 'auto' }}>
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

                    <ListItem component={Link} href="/authorization/mypage">
                        <ListItemIcon sx={{ color: '#ffffff' }}>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="마이페이지" />
                    </ListItem>

                    <ListItem component={Link} href="/favorites">
                        <ListItemIcon sx={{ color: '#ffffff' }}>
                            <Favorite />
                        </ListItemIcon>
                        <ListItemText primary="내가 찜한 담보물" />
                    </ListItem>
                    <ListItem component={Link} href="/my-bids">
                        <ListItemIcon sx={{ color: '#ffffff' }}>
                            <AssignmentTurnedIn />
                        </ListItemIcon>
                        <ListItemText primary="나의 입찰 목록" />
                    </ListItem>
                    <ListItem component={Link} href="/my-bids">
                        <ListItemIcon sx={{ color: '#ffffff' }}>
                            <ContactSupportIcon />
                        </ListItemIcon>
                        <ListItemText primary="고객센터" />
                    </ListItem>
                </List>

                <RibbonBanner
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        //marginTop: 'auto',
                        height: '5dvh',
                    }}
                    href="https://blog.naver.com/nplplatform00"
                />
            </Drawer>
        </>
    );
};
export default Sidebar;
