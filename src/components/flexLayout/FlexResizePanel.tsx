'use client';

import { MouseEvent, useEffect, useRef } from 'react';
import type { TouchEvent } from 'react';
import styles from './FlexLayout.module.css';
import flexDirectionModel from '@components/flexLayout/@types/FlexDirectionTypes';
import {
    findNotCloseFlexContent,
    isOverMove,
    mathWeight,
} from '@/components/flexLayout/FlexLayoutUtils';
import { ResizePanelMode } from '@/components/flexLayout/@types/FlexLayoutTypes';

type FlexResizePanelProps = {
    direction: string;
    childCount: number;
    panelMode?: ResizePanelMode;
};

const FlexResizePanel = ({
    direction,
    childCount,
    panelMode = 'default',
}: FlexResizePanelProps) => {
    let isResizePanelClick = false;
    let prevTouchEvent: globalThis.TouchEvent | null;
    let parentSize: number;
    let totalMovement: number;
    const panelRef = useRef<HTMLDivElement>(null);
    const panelMouseDownEvent = (
        event:
            | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
            | TouchEvent<HTMLDivElement>
    ) => {
        if (!panelRef.current || !panelRef.current.parentElement) return;

        isResizePanelClick = true;
        parentSize = panelRef.current.parentElement.getBoundingClientRect()[
            flexDirectionModel[direction].sizeName
        ] as number;
        prevTouchEvent = null;
        totalMovement = 0;

        if (!parentSize) return;
        document.body.style.cursor = flexDirectionModel[direction].resizeCursor;
    };

    const panelMouseUpEvent = (event: any) => {
        isResizePanelClick = false;
        parentSize = 0;
        prevTouchEvent = null;
        totalMovement = 0;
        document.body.style.cursor = '';
    };

    function moveMouseFlex(
        originTarget: HTMLDivElement,
        resizePanel: HTMLDivElement,
        moveEvent: {
            movementX: number;
            movementY: number;
        }
    ) {
        return new Promise<void>(resolve => {
            let movement =
                moveEvent[
                    ('movement' +
                        flexDirectionModel[direction].xy.toUpperCase()) as
                        | 'movementX'
                        | 'movementY'
                ];
            totalMovement += movement;
            const minSizeName = 'min-' + flexDirectionModel[direction].sizeName;
            const maxSizeName = 'max-' + flexDirectionModel[direction].sizeName;

            let targetElement = findNotCloseFlexContent(
                originTarget,
                'previousElementSibling'
            );
            if (!targetElement || 30 < movement) {
                targetElement = originTarget;
            }

            if (!targetElement) return;

            const targetRect = targetElement.getBoundingClientRect();
            const targetStyle = window.getComputedStyle(targetElement);
            const targetMinSize =
                parseFloat(targetStyle.getPropertyValue(minSizeName)) || 0;
            const targetMaxSize =
                parseFloat(targetStyle.getPropertyValue(maxSizeName)) || 0;
            let targetSize =
                (targetRect[flexDirectionModel[direction].sizeName] as number) +
                movement;
            if (targetMaxSize != 0 && targetSize >= targetMaxSize) {
                return;
                //targetSize = targetMaxSize;
            }

            let nextElement = findNotCloseFlexContent(
                resizePanel.nextElementSibling,
                'nextElementSibling'
            );

            if (!nextElement || 30 < movement * -1) {
                nextElement = resizePanel.nextElementSibling as HTMLDivElement;
            }

            if (!nextElement) return;

            const nextElementRect = nextElement.getBoundingClientRect();
            const nextElementStyle = window.getComputedStyle(nextElement);
            const nextElementMinSize =
                parseFloat(nextElementStyle.getPropertyValue(minSizeName)) || 0;
            const nextElementMaxSize =
                parseFloat(nextElementStyle.getPropertyValue(maxSizeName)) || 0;

            let nextElementSize =
                (nextElementRect[
                    flexDirectionModel[direction].sizeName
                ] as number) +
                movement * -1;
            if (
                nextElementMaxSize != 0 &&
                nextElementSize >= nextElementMaxSize
            ) {
                //nextElementSize = nextElementMaxSize;
                return;
            }
            if (isOverMove(targetSize, targetMinSize)) {
                nextElementSize = nextElementRect[
                    flexDirectionModel[direction].sizeName
                ] as number;
                targetSize = 0;
            } else if (isOverMove(nextElementSize, nextElementMinSize)) {
                targetSize = targetRect[
                    flexDirectionModel[direction].sizeName
                ] as number;
                nextElementSize = 0;
            }

            let targetFlexGrow = (targetSize / (parentSize - 1)) * childCount;
            targetElement.style.flex = `${targetFlexGrow} 1 0%`;
            let nextElementFlexGrow =
                (nextElementSize / (parentSize - 1)) * childCount;
            nextElement.style.flex = `${nextElementFlexGrow} 1 0%`;
            resolve();
        });
    }
    useEffect(() => {
        if (!panelRef.current) return;
        let notGrowList: Array<HTMLElement> = [];
        let totalGrow = [
            ...(panelRef.current.parentElement?.children || []),
        ].reduce((t, e, i) => {
            let item = e as HTMLElement;

            if (item.classList.contains(styles['flex-resize-panel'])) return t;

            if (e.hasAttribute('data-grow') == false) {
                notGrowList.push(item);
                return t;
            }
            let grow = parseFloat(item.dataset.grow || '');
            item.style.flex = `${grow} 1 0%`;
            t -= grow;
            return t;
        }, childCount);

        if (notGrowList.length != 0) {
            let resizeWeight = mathWeight(notGrowList.length, totalGrow);
            notGrowList.forEach(e => {
                if (e.hasAttribute('data-grow')) {
                    e.dataset.grow = resizeWeight.toString();
                } else {
                    e.style.flex = `${resizeWeight} 1 0%`;
                }
            });
        }
    });
    useEffect(() => {
        const addGlobalMoveEvent = function (event: Event) {
            if (!isResizePanelClick || !panelRef.current) {
                return;
            }
            event.preventDefault();
            //event.stopPropagation();
            let targetElement = panelRef.current
                .previousElementSibling as HTMLDivElement; //getContainerRefMap().get(activeIndex);
            let targetPanel = panelRef.current;
            if (!targetElement || !targetPanel) {
                return;
            }
            let move = { movementX: 0, movementY: 0 };

            if (window.TouchEvent && event instanceof window.TouchEvent) {
                if (!prevTouchEvent) {
                    prevTouchEvent = event as globalThis.TouchEvent;
                    //setPrevTouchEvent(event as TouchEvent);
                    return;
                }
                move.movementX =
                    (prevTouchEvent.touches[0].pageX -
                        (event as globalThis.TouchEvent).touches[0].pageX) *
                    -1;
                move.movementY =
                    (prevTouchEvent.touches[0].pageY -
                        (event as globalThis.TouchEvent).touches[0].pageY) *
                    -1;
                prevTouchEvent = event;
            } else {
                move.movementX = (event as globalThis.MouseEvent).movementX;
                move.movementY = (event as globalThis.MouseEvent).movementY;
            }
            moveMouseFlex(targetElement, targetPanel, move);
        };
        new Array('mousemove', 'touchmove').forEach(eventName => {
            window.addEventListener(eventName, addGlobalMoveEvent, {
                passive: false,
            });
        });
        new Array('mouseup', 'touchend').forEach(eventName => {
            window.addEventListener(eventName, panelMouseUpEvent);
        });
        return () => {
            new Array('mousemove', 'touchmove').forEach(eventName => {
                window.removeEventListener(eventName, addGlobalMoveEvent);
            });
            new Array('mouseup', 'touchend').forEach(eventName => {
                window.removeEventListener(eventName, panelMouseUpEvent);
            });
        };
    });

    return (
        <div
            className={`${styles['flex-resize-panel']} ${styles[panelMode]}`}
            ref={panelRef}
            onMouseDown={event => panelMouseDownEvent(event)}
            onTouchStart={event => panelMouseDownEvent(event)}
        >
            <div className={styles.hover}></div>
        </div>
    );
};

export default FlexResizePanel;
