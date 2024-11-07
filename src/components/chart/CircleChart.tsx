import { Doughnut, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    TooltipItem,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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
            },
        ],
    };
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
                                return `${context.label}: ${context.raw}%`; // 툴팁 내용
                            },
                        },
                    },
                },
            }}
        />
    );
};

export default CircleChart;
