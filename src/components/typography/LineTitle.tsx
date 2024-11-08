import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export default function LineTitle({
    children,
    lineColor = 'black',
}: {
    children: ReactNode;
    lineColor?: string;
}) {
    return (
        <Typography
            variant="h6"
            gutterBottom
            sx={{
                borderBottom: `2px solid ${lineColor}`, // 밑줄 추가
                paddingBottom: 1,
                color: '#333',
                fontWeight: 'bold',
            }}
        >
            {children}
        </Typography>
    );
}
