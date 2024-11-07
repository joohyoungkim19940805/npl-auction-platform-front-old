import GlobalModalWrapper from '@/components/modal/GlobalModalWrapper';
import { ReactNode } from 'react';
import { ModalType } from '@/app/@modal/(.)modal/[modal_name]/@types/ModalType';

interface ModelLayoutProps {
    children: ReactNode;
    params: {
        modal_name: ModalType;
    };
    types: string[]; // 필수 속성으로 지정
}

const ModelLayout = ({ children, params, types }: ModelLayoutProps) => {
    const { modal_name: modalName } = params;
    return (
        <GlobalModalWrapper isOpen={true} type={modalName}>
            {children}
        </GlobalModalWrapper>
    );
};

export default ModelLayout;
