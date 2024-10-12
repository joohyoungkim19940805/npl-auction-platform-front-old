export type AuctionItem = {
    title: string;
    assessmentAmount: number; //감정 평가액
    estimatedAmount: number; //매각 가액
    protectionAmount: number; // 보증금
    loanAmount: number; //채권금액
    mortgageAmount: number; // 저당권 설정 금액
    endDate: string;
    representativeImageUrl: string;
    id: number;
} | null;
