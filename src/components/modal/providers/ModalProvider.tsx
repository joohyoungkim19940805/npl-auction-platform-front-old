'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ModalProvider = () => {
    const router = useRouter();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const querys = Object.fromEntries(searchParams.entries()),
            { 'modal-state': modalState } = querys;
        if (!modalState) return;

        if (modalState) {
            // 모달을 띄우기 위한 라우팅 예시
            const { 'login-failed-state': loginFailedState } = querys;
            if (!loginFailedState || loginFailedState === 'unknown') {
                router.push(
                    '/modal/alert?&title=알 수 없는 이유로 로그인에 실패하였습니다.&text=죄송합니다.&text=잠시 후 다시 시도 하거나 고객센터에 문의를 부탁드립니다.'
                );
                return;
            }
        }
    }, [router]);
    return null;
};

export default ModalProvider;
