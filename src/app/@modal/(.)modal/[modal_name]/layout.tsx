import GlobalModalWrapper from '@/components/modal/GlobalModalWrapper';
import { ReactNode } from 'react';
import { ModalType } from '@/app/@modal/(.)modal/[modal_name]/@types/ModalType';

const ModelLayout = async ({
    children,
    params,
    searchParmas,
}: {
    children: ReactNode;
    params: Promise<{ modal_name: ModalType }>;
    searchParmas: any;
}) => {
    const { modal_name: modalName } = await params;
    return (
        <GlobalModalWrapper isOpen={true} type={modalName}>
            {children}
        </GlobalModalWrapper>
    );
};

export default ModelLayout;
