import { useState, MouseEvent } from 'react';
import {
    IconButton,
    ListItemText,
    Menu,
    MenuItem,
    SxProps,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // 물음표 아이콘

type MoreButtonProps = {
    options: Array<{
        label: string;
        onClick: () => void;
    }>;
    sx?: SxProps; // 스타일을 유연하게 적용할 수 있도록
};

const MoreButton = ({ options, sx }: MoreButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMoreClick = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // 이벤트 버블링을 막음
        setAnchorEl(event.currentTarget);
    };

    const handleMoreClose = () => {
        setAnchorEl(null);
    };

    const menuOpen = Boolean(anchorEl);

    return (
        <>
            {/* 더보기 버튼 */}
            <IconButton
                aria-label="more"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleMoreClick}
                sx={sx}
            >
                <MoreVertIcon />
            </IconButton>

            {/* 더보기 메뉴 */}
            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMoreClose}>
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            option.onClick();
                            handleMoreClose();
                        }}
                    >
                        <ListItemText primary={option.label} />
                        <IconButton
                            edge="end"
                            aria-label="help"
                            sx={{
                                color: '#486f99', // 물음표 아이콘 색상
                                fontSize: '1rem', // 아이콘 크기
                            }}
                        >
                            <HelpOutlineIcon fontSize="inherit" />
                        </IconButton>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default MoreButton;
