import { Box } from '@mui/material';

type YouTubeVideoProps = {
    videoId: string;
    title?: string; // 선택적으로 제목을 추가할 수 있음
};

const YouTubeVideo = ({ videoId, title }: YouTubeVideoProps) => {
    return (
        <Box sx={{ width: '100%', marginTop: '2rem', textAlign: 'center' }}>
            {title && <h3>{title}</h3>} {/* 선택적으로 제목을 표시 */}
            <Box
                component="iframe"
                sx={{ maxWidth: '60dvh', maxHeight: '60dvw' }}
                width="100%"
                height="25dvh"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </Box>
    );
};

export default YouTubeVideo;
