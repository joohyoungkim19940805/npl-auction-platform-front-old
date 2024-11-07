import MainContent from '@/components/MainContent';
import { ReactNode, Suspense } from 'react';
import ContentTab from '@/components/account/mypage/ContentTab';
import SubContentTab from '@/components/account/mypage/SubContentTab';
import Loading from '@/app/authorization/mypage/loading';
import { PageChangingLoading } from '@/components/PageChanger';

export default function MyPageLayout({ children }: { children: ReactNode }) {
    return (
        <MainContent isPageChangeLoading={false}>
            {/* 하위 네비게이션 */}
            <ContentTab></ContentTab>
            <SubContentTab></SubContentTab>
            <PageChangingLoading>{children}</PageChangingLoading>
        </MainContent>
    );
}
