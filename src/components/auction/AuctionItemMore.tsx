'use client';
import AuctionInfoModal from '@/components/auction/AuctionHelpModal';
import MoreButton from '@/components/MoreButton';
import { useState } from 'react';
import { AuctionItem } from '@/components/auction/@types/AuctionItemType';

const AuctionItemMore = ({
    assessmentAmount,
    estimatedAmount,
    protectionAmount,
    mortgageAmount,
    loanAmount,
}: NonNullable<AuctionItem>) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const options = [
        {
            label: `보증금: ${protectionAmount.toLocaleString()}원`,
            onClick: () => setIsModalOpen(true),
        },
        {
            label: `채권금액: ${loanAmount.toLocaleString()}원`,
            onClick: () => setIsModalOpen(true),
        },
        {
            label: `저당권 설정금액: ${mortgageAmount.toLocaleString()}원`,
            onClick: () => setIsModalOpen(true),
        },
        {
            label: `매각 가액: ${estimatedAmount.toLocaleString()}원`,
            onClick: () => setIsModalOpen(true),
        },
        {
            label: `감정 평가액: ${assessmentAmount.toLocaleString()}원`,
            onClick: () => setIsModalOpen(true),
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

            {/* 모달 */}
            <AuctionInfoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                infoText={'설명글 내용입니다.'}
            />
        </>
    );
};

export default AuctionItemMore;
