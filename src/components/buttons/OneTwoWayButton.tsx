import BlueButton from '@/components/buttons/BlueButton';
import { oneTwoWaySubject } from '@/handler/subject/ListWaySubject';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export const OneTwoWayButton = () => {
    const [isTwoColumn, setIsTwoColumn] = useState<boolean>(false);
    useEffect(() => {
        oneTwoWaySubject.next(isTwoColumn);
    }, [isTwoColumn]);

    return (
        <BlueButton
            variant="contained"
            onClick={() => {
                setIsTwoColumn(prev => !prev);
            }}
            sx={{ textWrap: 'nowrap', marginLeft: 'auto' }}
        >
            {isTwoColumn ? '2줄 보기' : '1줄 보기'}
        </BlueButton>
    );
};
