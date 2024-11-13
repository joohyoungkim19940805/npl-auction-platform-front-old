import { Box, Typography, Modal, IconButton } from '@mui/material';
import GlobalModalWrapper from '@/components/modal/GlobalModalWrapper';

const StandardModal = ({
    text,
    title,
}: {
    text: string | string[] | null;
    title: string;
}) => {
    console.log('text::: ', text);
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
            {text &&
                [...[text].flatMap(e => e)].map((e, i) => (
                    <Typography
                        key={i}
                        id="info-modal-description"
                        variant="body2"
                        sx={{
                            mt: 2,
                            color: '#666',
                            fontSize: '1rem', // 텍스트 크기 약간 키움
                        }}
                    >
                        {e}
                    </Typography>
                ))}
        </>
    );
};

export default StandardModal;
