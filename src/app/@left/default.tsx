import Sidebar from '@/components/layouts/Sidebar';

import { headers } from 'next/headers';
const Default = () => {
    let activeIndex = 1;
    const userAgent = headers().get('user-agent') || '';

    // 정규식을 통해 User-Agent에서 모바일 기기 확인
    const isSsrMobile =
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
            userAgent
        );

    return <Sidebar activeIndex={activeIndex} isSsrMobile={isSsrMobile} />;
};
export default Default;
