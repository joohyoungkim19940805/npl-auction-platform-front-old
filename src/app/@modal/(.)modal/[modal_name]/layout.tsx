import GlobalModalWrapper from '@/components/modal/GlobalModalWrapper';
import { ReactNode } from 'react';
import { ModalType } from '@/app/@modal/(.)modal/[modal_name]/@types/ModalType';

const ModelLayout = ({
    children,
    params,
}: {
    children: ReactNode;
    params: any;
}) => {
    const { modal_name: modalName } = params;
    return (
        <GlobalModalWrapper isOpen={true} type={modalName}>
            {children}
        </GlobalModalWrapper>
    );
};

export default ModelLayout;
