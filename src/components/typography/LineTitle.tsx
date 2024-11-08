import { styled } from '@mui/material/styles';
import { Typography, TypographyProps } from '@mui/material';
interface LineTitleProps extends TypographyProps {
    lineColor: string;
    textColor?: string;
}

export const LineTitle = styled(
    ({ textColor, lineColor, ...props }: LineTitleProps) => (
        <Typography {...props} />
    )
)(({ theme, textColor, lineColor }) => ({
    borderBottom: `2px solid ${lineColor}`, // 밑줄 추가
    paddingBottom: 1,
    color: `${textColor || '#333'}`,
    fontWeight: 'bold',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
}));
