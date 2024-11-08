'use client';
import { useState } from 'react';
import { AuctionItem } from '@/components/auction/@types/AuctionItemType';
import { useRouter } from 'next/navigation';
import MoreButton from '@/components/buttons/MoreButton';

const AuctionItemMore = ({
    assessmentAmount,
    estimatedAmount,
    protectionAmount,
    mortgageAmount,
    loanAmount,
}: NonNullable<AuctionItem>) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const router = useRouter();
    const options = [
        {
            label: `보증금: ${protectionAmount.toLocaleString()}원`,
            onClick: () => {
                router.push(
                    '/modal/confirm?content_name=AuctionInfoModal&text=설명글입니다.&title=설명제목입니다.'
                );
            },
        },
        {
            label: `채권금액: ${loanAmount.toLocaleString()}원`,
            onClick: () => {
                router.push(
                    '/modal/confirm?content_name=AuctionInfoModal&text=설명글입니다.&title=설명제목입니다.'
                );
            },
        },
        {
            label: `저당권 설정금액: ${mortgageAmount.toLocaleString()}원`,
            onClick: () => {
                router.push(
                    '/modal/confirm?content_name=AuctionInfoModal&text=설명글입니다.&title=설명제목입니다.'
                );
            },
        },
        {
            label: `매각 가액: ${estimatedAmount.toLocaleString()}원`,
            onClick: () => {
                router.push(
                    '/modal/confirm?content_name=AuctionInfoModal&text=설명글입니다.&title=설명제목입니다.'
                );
            },
        },
        {
            label: `감정 평가액: ${assessmentAmount.toLocaleString()}원`,
            onClick: () => {
                router.push(
                    '/modal/confirm?content_name=AuctionInfoModal&text=설명글입니다.&title=설명제목입니다.'
                );
            },
        },
    ];

    return (
        <>
            {/* MoreButton에서 children을 제거 */}
            <MoreButton
                options={options}
                sx={{
                    position: 'absolute',
                    padding: '0.65rem',
                    top: 0,
                    left: 0,
                }}
            />
        </>
    );
};

export default AuctionItemMore;
