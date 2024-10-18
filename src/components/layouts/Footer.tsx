import { Box, Typography, Link as MuiLink, Divider } from '@mui/material';
import Link from 'next/link';

const Footer = () => {
    return (
        <>
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
            >
                엔피엘플랫폼(주) | 대표 김병권
            </Typography>
            <Typography variant="body2" sx={{ margin: '0.5rem 0' }}>
                서울특별시 중구 서소문로 116, 유원빌딩 1402, 1403호
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: '1dvw',
                    //justifyContent: 'space-between',
                    margin: '0.5rem 0',
                }}
            >
                <Typography variant="body2">대표전화: 02-318-1207</Typography>|
                <Typography variant="body2">팩스: 02-6944-8455</Typography>
            </Box>
            <Typography variant="body2">
                통신판매업신고번호: 2021-서울중구-2222
            </Typography>

            <Typography variant="body2" sx={{ margin: '0.5rem 0' }}>
                개인정보보호책임자: 김병권 (
                <MuiLink href="mailto:info@nplplatform.co.kr">
                    info@nplplatform.co.kr
                </MuiLink>
                )
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                <Divider
                    sx={{
                        margin: '1rem 0',
                        borderColor: '#285a85',
                        width: '100%',
                        textAlign: 'center',
                    }}
                />
            </Box>
            <Typography
                variant="body2"
                sx={{ margin: '0.5rem 0', textAlign: 'center' }}
            >
                사업자등록번호: 632-86-02319
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0.5rem 0',
                }}
            >
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                    Copyrights ©{' '}
                    <MuiLink
                        href="https://www.nplplatform.co.kr"
                        target="_blank"
                    >
                        www.nplplatform.co.kr
                    </MuiLink>{' '}
                    All rights reserved.
                </Typography>
            </Box>
        </>
    );
};
export default Footer;
