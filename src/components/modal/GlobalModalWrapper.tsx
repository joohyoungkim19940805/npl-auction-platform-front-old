'use client';
import { Box, Typography, Modal, IconButton, Button } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { ModalType } from '@/app/@modal/(.)modal/[modal_name]/@types/ModalType';
export default function GlobalModalWrapper({
    isOpen: initOpen,
    type = 'message',
    onCancelAfterMoveUrl,
    onCheckAfterMoveUrl,
    children,
}: {
    isOpen: boolean;
    type?: ModalType;
    onCancelAfterMoveUrl?: string;
    onCheckAfterMoveUrl?: string;
    children: ReactNode;
}) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(initOpen);
    useEffect(() => {
        if (isOpen) return;
    }, [isOpen, router]);
    return (
        <Modal
            open={isOpen}
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
                    onClick={() => {
                        (onCancelAfterMoveUrl &&
                            router.push(onCancelAfterMoveUrl)) ||
                            router.back();
                    }}
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {children}
                {type === 'alert' ? (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 4 }}
                        onClick={() => {
                            (onCancelAfterMoveUrl &&
                                router.replace(onCancelAfterMoveUrl)) ||
                                router.back();
                        }}
                    >
                        확인
                    </Button>
                ) : type === 'confirm' ? (
                    <Box
                        sx={{
                            mt: 4,
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => {
                                (onCancelAfterMoveUrl &&
                                    router.replace(onCancelAfterMoveUrl)) ||
                                    router.back();
                            }}
                        >
                            취소
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                (onCheckAfterMoveUrl &&
                                    router.replace(onCheckAfterMoveUrl)) ||
                                    router.back();
                            }}
                        >
                            확인
                        </Button>
                    </Box>
                ) : (
                    <></>
                )}
            </Box>
        </Modal>
    );
}
