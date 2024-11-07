import { Box } from '@mui/material';

export default function LoadingSpinner({
    position = 'fixed',
    rect = 'center',
    size = { w: '11rem', h: '11rem' },
}: {
    position?: 'static' | 'absolute' | 'fixed';
    rect?: 'start' | 'end' | 'center';
    size?: { w: string; h: string };
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: position,
                top: 0,
                height: '100%',
                width: '100%',
                zIndex: 9999,
                backgroundColor: '#ffffffa6',
            }}
        >
            <Box
                sx={{
                    border: '0.8vmax solid #f3f3f3',
                    borderRadius: '50%',
                    borderTop: '0.8vmax solid #3498db',
                    width: size.w,
                    height: size.h,
                    margin: '0 auto',
                    animation: 'spin 2s linear infinite',
                    '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                    },
                }}
            />
        </Box>
    );
}
