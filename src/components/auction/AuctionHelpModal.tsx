import { Box, Typography, Modal, IconButton } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    infoText: string | null;
}

const AuctionInfoModal = ({ isOpen, onClose, infoText }: InfoModalProps) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="info-modal-title"
            aria-describedby="info-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '80dvh',
                    width: '95%',
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: '16px', // 더 둥글게 설정
                    textAlign: 'center',
                    backgroundImage:
                        'linear-gradient(135deg, #f5f7fa, #c3cfe2)', // 그라데이션 추가
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // 더 깊은 박스 그림자
                    transition: 'opacity 0.3s ease', // 애니메이션 추가
                }}
            >
                {/* 닫기 버튼 */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography
                    id="info-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 'bold', color: '#333' }}
                >
                    설명
                </Typography>
                <Typography
                    id="info-modal-description"
                    variant="body2"
                    sx={{
                        mt: 2,
                        color: '#666',
                        fontSize: '1rem', // 텍스트 크기 약간 키움
                    }}
                >
                    {infoText}
                </Typography>
            </Box>
        </Modal>
    );
};

export default AuctionInfoModal;
