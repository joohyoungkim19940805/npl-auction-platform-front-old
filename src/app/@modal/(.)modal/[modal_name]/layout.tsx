import GlobalModalWrapper from '@/components/modal/GlobalModalWrapper';
import { ReactNode } from 'react';
import { ModalType } from '@/app/@modal/(.)modal/[modal_name]/@types/ModalType';

interface ModelLayoutProps {
    children: ReactNode;
    params: Promise<{ modal_name: ModalType }>;
    types: string[]; // types를 필수 속성으로 지정
}

const ModelLayout = async ({ children, params, types }: ModelLayoutProps) => {
    const { modal_name: modalName } = await params;
    return (
        <GlobalModalWrapper isOpen={true} type={modalName}>
            {children}
        </GlobalModalWrapper>
    );
};

// displayName 추가
ModelLayout.displayName = 'ModelLayout';

export default ModelLayout;
