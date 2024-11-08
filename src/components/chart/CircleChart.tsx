'use client';
import { Doughnut, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    TooltipItem,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const CircleChart = ({
    dataset,
    labels,
    colors,
}: {
    dataset: number[];
    labels: string[];
    colors: string[];
}) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: dataset,
                backgroundColor: colors,
                borderWidth: 1,
                //hoverOffset: 100, // hoverOffset을 데이터셋 수준에서 설정
            },
        ],
    };
    const [labelFontSize, setLabelFontSzie] = useState(14);
    useEffect(() => {
        setLabelFontSzie(
            parseFloat(
                window.getComputedStyle(document.documentElement).fontSize
            ) * 0.56
        );
    }, []);
    return (
        <Pie
            data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 0, // 모든 애니메이션 제거
                    animateScale: false, // 크기 확대 애니메이션 비활성화
                    animateRotate: false, // 회전 애니메이션 비활성화
                },
                plugins: {
                    legend: {
                        display: false, // 기본 라벨 숨기기
                    },
                    tooltip: {
                        enabled: true, // 호버 시에만 툴팁 표시
                        callbacks: {
                            label: function (context: TooltipItem<'pie'>) {
                                //return `${context.label}: ${context.raw}%`; // 툴팁 내용
                                return `${context.raw}%`;
                            },
                        },
                    },
                    datalabels: {
                        color: '#fff', // 라벨 색상
                        formatter: (value: number, context: any) => {
                            const label =
                                context.chart.data.labels[context.dataIndex];
                            //return `${label}: ${value}%`; // 라벨 포맷
                            return label;
                        },
                        anchor: 'center', // 라벨 위치 조정
                        align: 'center',
                        font: {
                            size: labelFontSize,
                        },
                    },
                },
            }}
        />
    );
};

export default CircleChart;
