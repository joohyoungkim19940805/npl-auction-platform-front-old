'use client';
import { OneTwoWayButton } from '@/components/buttons/OneTwoWayButton';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    Paper,
    Typography,
    Grid2,
    Autocomplete,
    TextField,
} from '@mui/material';
import { useState } from 'react';

// 상위 지역 타입 정의
interface Region {
    label: string;
    value: string;
}
const regions: Region[] = [
    { label: '전체', value: 'all' },
    { label: '서울', value: 'seoul' },
    { label: '부산', value: 'busan' },
    { label: '대구', value: 'daegu' },
    { label: '인천', value: 'incheon' },
    { label: '광주', value: 'gwangju' },
    { label: '대전', value: 'daejeon' },
    { label: '울산', value: 'ulsan' },
    // 추가 지역 데이터...
];
// 하위 지역 타입 정의
interface SubRegion {
    label: string;
    value: string;
}
// 하위 지역 데이터 (구, 군 등)
const subRegions: { [key: string]: SubRegion[] } = {
    all: [{ label: '전체', value: 'all' }],
    seoul: [
        { label: '전체', value: 'all' },
        { label: '강남구', value: 'gangnam' },
        { label: '금천구', value: 'geumcheon' },
        { label: '종로구', value: 'jongno' },
    ],
    busan: [
        { label: '전체', value: 'all' },
        { label: '해운대구', value: 'haeundae' },
        { label: '동래구', value: 'dongnae' },
        { label: '수영구', value: 'suyeong' },
    ],
    daegu: [
        { label: '전체', value: 'all' },
        { label: '중구', value: 'junggu' },
        { label: '동구', value: 'donggu' },
        { label: '서구', value: 'seogu' },
    ],
    incheon: [
        { label: '전체', value: 'all' },
        { label: '남동구', value: 'namdong' },
        { label: '부평구', value: 'bupyeong' },
        { label: '연수구', value: 'yeonsu' },
    ],
    gwangju: [
        { label: '전체', value: 'all' },
        { label: '북구', value: 'bukgu' },
        { label: '광산구', value: 'gwangsan' },
        { label: '남구', value: 'namgu' },
    ],
    daejeon: [
        { label: '전체', value: 'all' },
        { label: '서구', value: 'seogu' },
        { label: '동구', value: 'donggu' },
        { label: '유성구', value: 'yuseong' },
    ],
    ulsan: [
        { label: '전체', value: 'all' },
        { label: '남구', value: 'namgu' },
        { label: '동구', value: 'donggu' },
        { label: '중구', value: 'junggu' },
    ],
};
const RegionFilter = () => {
    // 정렬 옵션 목록
    const sortOptions = [
        { value: 'price-asc', label: '가격 오름차순' },
        { value: 'price-desc', label: '가격 내림차순' },
        { value: 'date-asc', label: '날짜 오름차순' },
        { value: 'date-desc', label: '날짜 내림차순' },
    ];
    const [isTwoColumn, setIsTwoColumn] = useState<boolean>(false);
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null); // 상위 지역 선택 상태
    const [selectedSubRegion, setSelectedSubRegion] =
        useState<SubRegion | null>(null); // 하위 지역 선택 상태
    // 상위 지역 선택 시 실행되는 함수
    const handleRegionChange = (
        _event: React.ChangeEvent<{}>,
        newValue: Region | null
    ) => {
        setSelectedRegion(newValue);
        setSelectedSubRegion(null); // 상위 지역이 바뀌면 하위 지역 초기화
    };
    // 하위 지역 선택 시 실행되는 함수
    const handleSubRegionChange = (
        _event: React.ChangeEvent<{}>,
        newValue: SubRegion | null
    ) => {
        setSelectedSubRegion(newValue);
    };

    return (
        <Box sx={{ marginBottom: '1rem' }}>
            {/* 보기 옵션 및 필터/정렬 기능 */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '5vw',
                }}
            >
                <OneTwoWayButton />

                {/* 정렬 조건 */}
                <FormControl variant="outlined">
                    <InputLabel>정렬 조건</InputLabel>
                    <Select defaultValue={'date-desc'} label="정렬 조건">
                        {sortOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* 지역별 필터 */}
                <Autocomplete
                    options={regions}
                    getOptionLabel={option => option.label}
                    defaultValue={regions[0]} // 첫 번째 옵션을 기본값으로 설정
                    onChange={handleRegionChange}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="지역 검색"
                            variant="outlined"
                        />
                    )}
                />
                {/* 하위 지역 선택 (상위 지역 선택 후에만 활성화) */}
                {selectedRegion && selectedRegion.value !== 'all' && (
                    <Autocomplete
                        options={subRegions[selectedRegion.value] || []}
                        getOptionLabel={option => option.label}
                        defaultValue={subRegions[selectedRegion.value][0]}
                        onChange={handleSubRegionChange}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="하위 지역 검색"
                                variant="outlined"
                            />
                        )}
                    />
                )}
            </Box>
        </Box>
    );
};

export default RegionFilter;
