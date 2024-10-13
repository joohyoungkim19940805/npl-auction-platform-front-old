'use client';
import {
    Autocomplete,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

// 정렬 옵션 정의
const sortOptions = [
    { value: 'price-asc', label: '가격 오름차순' },
    { value: 'price-desc', label: '가격 내림차순' },
    { value: 'date-asc', label: '날짜 오름차순' },
    { value: 'date-desc', label: '날짜 내림차순' },
];

const SortSelect = () => {
    const [selectedOption, setSelectedOption] = useState(sortOptions[1]); // 기본 선택값 설정

    return (
        <Autocomplete
            options={sortOptions} // 옵션 목록
            getOptionLabel={option => option.label} // 각 옵션의 표시 라벨
            defaultValue={sortOptions[1]} // 현재 선택된 값
            disableCloseOnSelect // 선택 시 드롭다운 닫지 않기
            onChange={(_, newValue) => {
                if (newValue) setSelectedOption(newValue); // 새 값 설정
            }}
            renderInput={params => (
                <TextField {...params} label="정렬 조건" variant="outlined" />
            )}
            sx={{ width: '100%', maxWidth: '50dvw' }} // 스타일 적용
        />
    );
};

export default SortSelect;
