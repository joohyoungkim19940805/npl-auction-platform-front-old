'use client';
import { MouseEvent, useState } from 'react';
import { IconButton, keyframes, SxProps } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type LikeButtonProps = {
    initialLiked?: boolean;
    sx?: SxProps; // 스타일 props로 위치 및 스타일 설정
    id: number;
};
// 좋아요 애니메이션 효과
const likeAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;
// 좋아요 취소 애니메이션 효과 (작아지는 효과)
const unlikeAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.8); }
  100% { transform: scale(1); }
`;
const LikeButton = ({ initialLiked = false, sx, id }: LikeButtonProps) => {
    const [isLiked, setIsLiked] = useState(initialLiked);

    const handleLikeClick = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // 이벤트 버블링을 막음
        setIsLiked(prev => !prev);
        // if (onToggleLike) {
        //     onToggleLike(newLikedState); // 좋아요 상태가 변경될 때 호출되는 콜백
        // }
    };

    return (
        <IconButton
            onClick={handleLikeClick}
            sx={{
                animation: isLiked
                    ? `${likeAnimation} 0.3s ease`
                    : `${unlikeAnimation} 0.3s ease`,
                ...sx,
            }}
        >
            {isLiked ? (
                <FavoriteIcon sx={{ color: '#ff6f61' }} /> // 덜 진한 빨간색
            ) : (
                <FavoriteBorderIcon />
            )}
        </IconButton>
    );
};

export default LikeButton;
