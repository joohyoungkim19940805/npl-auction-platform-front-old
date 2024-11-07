import GlobalModalWrapper from '@/components/modal/GlobalModalWrapper';
import { ReactNode } from 'react';
import { ModalType } from '@/app/@modal/(.)modal/[modal_name]/@types/ModalType';

const ModelLayout = ({
    children,
    params,
}: {
    children: ReactNode;
    params: { modal_name: ModalType }; // Promise가 아닌 동기식 타입으로 수정
}) => {
    const { modal_name: modalName } = params;
    return (
        <GlobalModalWrapper isOpen={true} type={'message'}>
            {children}
        </GlobalModalWrapper>
    );
};

export default ModelLayout;
