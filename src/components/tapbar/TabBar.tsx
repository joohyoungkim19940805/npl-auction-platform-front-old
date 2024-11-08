import { styled } from '@mui/material/styles';
import { Box, Tabs, TabsProps } from '@mui/material';

export interface TabItem {
    pageName: string;
    url: string;
    subTabs?: TabItem[];
}
export const TabBarWrapper = styled(Box)`
    background-image: linear-gradient(
        180deg,
        #f0f4f8 0%,
        #d9e2ec 50%,
        #f0f4f8 100%
    );
    display: flex;
    width: 100%;
`;

export const TabBar = styled(Tabs)`
    width: 100%;
    & .MuiTabs-flexContainer {
        justify-content: space-around;
    }
    & .MuiTab-root {
        color: #a7a7a7;
        font-weight: bold;
        &.Mui-selected {
            color: #777777;
        }
    }
`;
