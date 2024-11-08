'use client';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

export const PageChangingLoading = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 초기값을 true로 설정
    const pathname = usePathname();
    const childrenRenderingObseverRef = useRef<HTMLTemplateElement>(null); // template에 ref 설정
    useEffect(() => {
        if (!childrenRenderingObseverRef.current) return;
        const observer = new MutationObserver((mutationList, observer) => {
            // children의 DOM 변경을 감지한 경우 로딩 해제
            mutationList.forEach(mutation => {
                console.log(mutation);
                setIsLoading(false);
                // if (
                //     mutation.addedNodes.length !== 0 &&
                //     mutation.removedNodes.length === 0
                // ) {
                //     setIsLoading(false);
                // } else if (
                //     mutation.addedNodes.length === 0 &&
                //     mutation.removedNodes.length !== 0
                // ) {
                //     setIsLoading(true);
                // }
            });
        });
        observer.observe(childrenRenderingObseverRef.current, {
            childList: true,
            subtree: false,
        });
        return () => observer.disconnect(); // 컴포넌트 언마운트 시 observer 정리
    });
    useEffect(() => {
        if (!childrenRenderingObseverRef.current) return;
        setIsLoading(!childrenRenderingObseverRef.current.hasChildNodes());
    }, [childrenRenderingObseverRef]);
    useEffect(() => {
        if (!childrenRenderingObseverRef.current) return;
        console.log('pathname:::', pathname);
        if (childrenRenderingObseverRef.current.hasChildNodes()) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
    }, [pathname]);
    return (
        <>
            {isLoading && <LoadingSpinner position="fixed" />}
            <main
                ref={childrenRenderingObseverRef}
                style={isLoading ? { opacity: 0, visibility: 'hidden' } : {}}
            >
                {children}
            </main>
        </>
    );
};
