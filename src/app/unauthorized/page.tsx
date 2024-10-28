import SimpleLogin from '@/components/account/SimpleLogin';
import MainContent from '@/components/MainContent';
import { Box } from '@mui/material';

const UnauthorizedPage = () => {
    return (
        <MainContent>
            <SimpleLogin></SimpleLogin>
        </MainContent>
    );
};

export default UnauthorizedPage;
