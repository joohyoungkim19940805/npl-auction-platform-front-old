import { PageChangingLoading } from '@/components/PageChanger';
import { Box } from '@mui/material';
import { ReactNode } from 'react';
const MainContent = ({
    children,
    isPageChangeLoading = false,
}: {
    children: ReactNode;
    isPageChangeLoading?: boolean;
}) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    height: '100%',
                    flexWrap: 'nowrap',
                    textWrap: 'nowrap',
                    overflowWrap: 'anywhere',
                }}
            >
                {isPageChangeLoading ? (
                    <PageChangingLoading>{children}</PageChangingLoading>
                ) : (
                    children
                )}
            </Box>
        </Box>
    );
};

export default MainContent;
