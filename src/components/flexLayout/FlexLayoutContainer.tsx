'use client';
import { ReactNode, useEffect, useRef } from 'react';
import styles from './FlexLayout.module.css';
import { FlexContainerProps } from '@/components/flexLayout/@types/FlexLayoutTypes';
import { useSize } from '@/handler/hooks/SizeChangeHooks';
import { mathGrow } from '@/components/flexLayout/FlexLayoutUtils';
import { setContainerRef } from '@/components/flexLayout/FlexLayoutContainerStore';
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
        isFitContent && fitContent
            ? useSize(fitContent)
            : { ref: null, size: null };
    const flexContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!flexContainerRef.current) return;
        setContainerRef(layoutName, containerName, flexContainerRef);
    });
    useEffect(() => {
        if (
            !flexContainerRef.current ||
            !ref ||
            !ref.current ||
            !size ||
            !fitContent
        )
            return;
        const sizeName = `${fitContent.charAt(0).toUpperCase() + fitContent.substring(1)}`;
        const parentSize =
            (flexContainerRef.current.parentElement &&
                flexContainerRef.current.parentElement[
                    ('client' + sizeName) as 'clientWidth' | 'clientHeight'
                ]) ||
            0;

        flexContainerRef.current.style[
            ('max' + sizeName) as 'maxWidth' | 'maxHeight'
        ] = size + 'px';
        const newGrow = mathGrow(size, parentSize, containerCount);
        if (isFitResize) {
            flexContainerRef.current.dataset.grow = newGrow.toString();
            flexContainerRef.current.style.flex = `${flexContainerRef.current.dataset.grow} 1 0%`;
            flexContainerRef.current.dataset.prev_grow =
                flexContainerRef.current.dataset.grow;
        } else {
            flexContainerRef.current.dataset.prev_grow = newGrow.toString();
        }
    }, [size]);

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
