import GlobalModalWrapper from '@/components/modal/GlobalModalWrapper';
import { ModalType } from '@/app/@modal/(.)modal/[modal_name]/@types/ModalType';
import AuctionInfoModal from '@/components/modal/AuctionInfoModal';
import StandardModal from '@/components/modal/StandardModal';

const ModalPage = async ({
    //params,
    searchParams,
}: {
    //params: Promise<{ modal_name: ModalType }>;
    searchParams: Promise<{
        content_name: string;
        text: string;
        title: string;
    }>;
}) => {
    const { content_name: contentName, text, title } = await searchParams;
    const lodaModalContent = async (contentName: string) => {
        try {
            const component = await import(`@components/modal/${contentName}`);
            return component.default;
        } catch (error) {
            console.error('존재하지 않는 모달이 호출되었습니다.');
            return null;
        }
    };
    const ModalContent = await lodaModalContent(contentName);
    return (
        <>
            {/* 모달 컨텐츠 - 쿼리스트링에 따라 표시 */}
            {(ModalContent && (
                <ModalContent text={text} title={title}></ModalContent>
            )) || <StandardModal text={text} title={title}></StandardModal>}
        </>
    );
};

export default ModalPage;
