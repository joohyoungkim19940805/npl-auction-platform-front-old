import GlobalModalWrapper from '@/components/modal/GlobalModalWrapper';
import { ReactNode } from 'react';
import { ModalType } from '@/app/@modal/(.)modal/[modal_name]/@types/ModalType';

const ModelLayout = ({
    children,
    params,
    types,
}: {
    children: ReactNode;
    params: {
        modal_name: ModalType;
    };
    types: string[]; // 예시로 string 배열로 설정
}) => {
    const { modal_name: modalName } = params;
    return (
        <GlobalModalWrapper isOpen={true} type={modalName}>
            {children}
        </GlobalModalWrapper>
    );
};

export default ModelLayout;
