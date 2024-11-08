import GlobalModalWrapper from '@/components/modal/GlobalModalWrapper';
import { ReactNode } from 'react';
import { ModalType } from '@/app/@modal/(.)modal/[modal_name]/@types/ModalType';

interface ModelLayoutProps {
    children: ReactNode;
    params: {
        modal_name: ModalType;
    };
}

const ModelLayout = ({ children, params }: ModelLayoutProps) => {
    const { modal_name: modalName } = params;
    return (
        <GlobalModalWrapper isOpen={true} type={modalName}>
            {children}
        </GlobalModalWrapper>
    );
};

// displayName 추가
ModelLayout.displayName = 'ModelLayout';

export default ModelLayout;
