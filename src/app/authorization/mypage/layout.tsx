import MainContent from '@/components/MainContent';
import { ReactNode, Suspense } from 'react';
import Loading from '@/app/authorization/mypage/loading';
import { PageChangingLoading } from '@/components/PageChanger';
import MyPageTab from '@/components/account/mypage/MyPageTab';
const tabs = [
    {
        pageName: '마이페이지',
        url: '/authorization/mypage',
        subTabs: [
            { pageName: '회원 정보', url: '#section-0' },
            { pageName: '통계', url: '#section-1' },
            { pageName: '추천', url: '#section-2' },
        ],
    },
    {
        pageName: '보관함',
        url: '/authorization/mypage/storagebox',
        subTabs: [
            { pageName: '보관함 1', url: '#storage-1' },
            { pageName: '보관함 2', url: '#storage-2' },
        ],
    },
    {
        pageName: '구독함',
        url: '/authorization/mypage/subscriptions',
        subTabs: [
            { pageName: '구독 1', url: '#subscription-1' },
            { pageName: '구독 2', url: '#subscription-2' },
        ],
    },
];

export default function MyPageLayout({ children }: { children: ReactNode }) {
    return (
        <MainContent isPageChangeLoading={false}>
            {/* 하위 네비게이션 */}
            <MyPageTab tabs={tabs}></MyPageTab>
            <PageChangingLoading>{children}</PageChangingLoading>
        </MainContent>
    );
}
