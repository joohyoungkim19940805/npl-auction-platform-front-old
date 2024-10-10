// 남은 시간을 계산할 때 사용할 타입 정의
export interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    expired?: boolean; // 경매 종료 여부
}

export const calculateTimeLeft = (endDate: string): TimeLeft => {
    const endTime = new Date(endDate).getTime();
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        if (days > 0) {
            return { days, hours };
        } else if (hours > 0) {
            return { hours, minutes };
        } else if (minutes > 0) {
            return { minutes, seconds };
        } else {
            return { seconds };
        }
    } else {
        return { expired: true }; // 경매 종료 시 처리
    }
};
