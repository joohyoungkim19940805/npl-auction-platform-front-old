import { oneTwoWaySubject } from '@/handler/subject/ListWaySubject';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export const OneTwoWayButton = () => {
    const [isTwoColumn, setIsTwoColumn] = useState<boolean>(false);
    useEffect(() => {
        oneTwoWaySubject.next(isTwoColumn);
    }, [isTwoColumn]);

    return (
        <Button
            variant="contained"
            onClick={() => {
                setIsTwoColumn(prev => !prev);
            }}
            sx={{ textWrap: 'nowrap' }}
        >
            {isTwoColumn ? '2줄 보기' : '1줄 보기'}
        </Button>
    );
};
