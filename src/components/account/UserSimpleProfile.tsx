'use client';
import { Avatar, Box, Typography } from '@mui/material';
import Link from 'next/link';

const SimpleUserProfile = ({
    profileImage,
    username,
    likeCount,
}: {
    profileImage: string | undefined;
    username: string;
    likeCount: number;
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
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
                alt={`${username}님의 프로필`}
            >
                {/* 프로필 이미지가 없을 때만 첫 글자 표시 */}
                {!profileImage && username.toUpperCase()}
            </Avatar>
            <Typography
                variant="h6"
                sx={{ marginTop: '1rem', textWrap: 'auto' }}
            >
                {username}님 환영합니다
            </Typography>
            <Box
                display={'flex'}
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                    좋아요한 담보 물건 :
                    <Typography
                        variant="caption"
                        sx={{
                            marginLeft: '0.25rem',
                            textDecoration: 'underline',
                            textUnderlineOffset: '0.17rem',
                            cursor: 'pointer',
                        }}
                    >
                        <Link href="/">{likeCount || 0} 개</Link>
                    </Typography>
                </Typography>
            </Box>
            {/* 마이페이지 링크 */}
            <Typography
                variant="body2"
                component={Link}
                href="/authorization/mypage"
                sx={{
                    marginTop: '0.85rem',
                    color: '#ffffff',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    textAlign: 'center',
                }}
            >
                마이페이지
            </Typography>
        </Box>
    );
};

export default SimpleUserProfile;
