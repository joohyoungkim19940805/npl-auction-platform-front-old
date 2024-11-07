import { Box, Typography, Modal, IconButton } from '@mui/material';
import GlobalModalWrapper from '@/components/modal/GlobalModalWrapper';

const AuctionInfoModal = ({
    text,
    title,
}: {
    text: string | null;
    title: string;
}) => {
    return (
        <>
            {title && (
                <Typography
                    id="info-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold', color: '#333' }}
                >
                    {title}
                </Typography>
            )}
            <Typography
                id="info-modal-description"
                variant="body2"
                sx={{
                    mt: 2,
                    color: '#666',
                    fontSize: '1rem', // 텍스트 크기 약간 키움
                }}
            >
                {text}
            </Typography>
        </>
    );
};

export default AuctionInfoModal;
