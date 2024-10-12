import { Box, SxProps } from '@mui/material';
import { display, width } from '@mui/system';
import Link from 'next/link';

const RibbonBanner = ({ href, sx }: { href: string; sx?: SxProps }) => {
    /*
	1-2. Universal Links 사용:
Link를 클릭하면 특정 URL을 통해 앱이 열리거나, 앱이 설치되지 않았을 때 브라우저가 열리게끔 설정하는 방식입니다. 앱 쪽에서 Universal Links 또는 App Links 설정을 하고, Next.js 쪽에서는 평소와 같이 링크를 설정합니다.
	*/
    return (
        <Box sx={{ display: 'flex', ...sx }}>
            <Link
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'inline-flex',
                }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                passHref
            >
                <Box
                    component="img"
                    src="blog_bn.jpg"
                    alt={'엔피엘플랫폼 공식 블로그'}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                    }}
                />
            </Link>
        </Box>
    );
};

export default RibbonBanner;
