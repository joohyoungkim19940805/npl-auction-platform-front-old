'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './FlexLayout.module.css';
import { FlexContainerProps } from '@/components/flexLayout/@types/FlexLayoutTypes';
import { useSize } from '@/handler/hooks/SizeChangeHooks';
import {
    getGrow,
    mathGrow,
    remain,
} from '@/components/flexLayout/FlexLayoutUtils';
import {
    getLayout,
    setContainerRef,
} from '@/components/flexLayout/FlexLayoutContainerStore';
import { filter } from 'rxjs';
export const FlexLayoutContainer = ({
    isFitContent,
    isFitResize,
    fitContent,
    containerCount,
    layoutName,
    containerName,
    ...props
}: FlexContainerProps) => {
    const { ref, size } =
        // isFitContent && fitContent
        //?
        useSize(fitContent);
    //: { ref: null, size: null };
    const flexContainerRef = useRef<HTMLDivElement>(null);
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    useEffect(() => {
        if (!flexContainerRef.current) return;
        setContainerRef(layoutName, containerName, flexContainerRef);
    }, [containerName, layoutName]);
    useEffect(() => {
        // 컴포넌트 크기 및 설정값에 따른 사이즈 재조정
        if (
            !flexContainerRef.current ||
            !ref ||
            !ref.current ||
            !size ||
            !fitContent
            //||getGrow(flexContainerRef.current) == 0
        )
            return;
        const sizeName = `${fitContent.charAt(0).toUpperCase() + fitContent.substring(1)}`;
        const parentSize =
            (flexContainerRef.current.parentElement &&
                flexContainerRef.current.parentElement[
                    ('client' + sizeName) as 'clientWidth' | 'clientHeight'
                ]) ||
            0;
        if (isFitContent) {
            flexContainerRef.current.style[
                ('max' + sizeName) as 'maxWidth' | 'maxHeight'
            ] = size + 'px';
        }
        const newGrow = mathGrow(size, parentSize, containerCount);
        if (!isFitResize && isFirstLoad) {
            setIsFirstLoad(false);
            return;
        }

        flexContainerRef.current.dataset.prev_grow =
            flexContainerRef.current.dataset.grow;
        flexContainerRef.current.dataset.grow = newGrow.toString();
        if (
            getGrow(flexContainerRef.current) != 0 &&
            flexContainerRef.current.hasAttribute('data-open')
        ) {
            flexContainerRef.current.style.flex = `${flexContainerRef.current.dataset.grow} 1 0%`;
        }
    }, [
        size,
        ref,
        containerCount,
        fitContent,
        isFirstLoad,
        isFitContent,
        isFitResize,
    ]);

    return (
        <div
            ref={flexContainerRef}
            className={styles['flex-container']}
            style={{
                flex: `${props['data-grow']} 1 0%`,
            }}
            {...props}
        >
            {(isFitContent && (
                <div
                    className={`${styles['flex-content-fit-wrapper']}`}
                    ref={ref}
                >
                    {props.children}
                </div>
            )) ||
                props.children}
        </div>
    );
};
