import Header from '@/components/layouts/Header';
import { headers } from 'next/headers'; // headers 함수 사용

const Default = async () => {
    const userAgent = (await headers()).get('user-agent') || '';

    // 정규식을 통해 User-Agent에서 모바일 기기 확인
    const isSsrMobile =
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
            userAgent
        );

    return <Header isSsrMobile={isSsrMobile}></Header>;
};
export default Default;
