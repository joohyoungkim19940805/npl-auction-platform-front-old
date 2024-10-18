'use client';
import { OneTwoWayButton } from '@/components/buttons/OneTwoWayButton';
import SortSelect from '@/components/SortSelect';
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
import { MouseEvent, useRef, useState } from 'react';

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
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // 투명한 흰 배경
                //boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // 부드러운 그림자
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                backdropFilter: 'blur(10px)', // 배경 블러 효과
                transition: 'background-color 0.3s ease-in-out', // 배경색 전환 애니메이션
            }}
        >
            {/* 보기 옵션 및 필터/정렬 기능 */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: '#003366',
                    }}
                >
                    검색 조건
                </Typography>
                <OneTwoWayButton />

                {/* 정렬 조건 */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                    }}
                >
                    <SortSelect />
                </Box>
                {/* 지역별 필터 */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                    }}
                >
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
                        sx={{ minWidth: '30%' }}
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
                            sx={{ minWidth: '30%' }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default RegionFilter;
