import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Default = () => {
    return (
        <Box
            component="footer"
            sx={{
                p: 2,
                backgroundColor: '#1976d2',
                color: '#fff',
                textAlign: 'center',
            }}
        >
            <Typography variant="body2">
                © 2024 NPL Platform. All rights reserved.
            </Typography>
        </Box>
    );
};
export default Default;
