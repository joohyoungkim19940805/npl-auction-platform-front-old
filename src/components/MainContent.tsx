import { Box } from '@mui/material';
import { ReactNode } from 'react';

const MainContent = ({ children }: { children: ReactNode }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    flexWrap: 'nowrap',
                    textWrap: 'nowrap',
                    overflowWrap: 'anywhere',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainContent;
