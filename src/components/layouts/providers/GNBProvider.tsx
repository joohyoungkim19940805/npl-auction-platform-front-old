'use client';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { getLayout } from '@/components/flexLayout/FlexLayoutContainerStore';
import {
    closeFlex,
    getGrow,
    mathGrow,
    openFlex,
} from '@/components/flexLayout/FlexLayoutUtils';
import { buffer, debounceTime, filter, fromEvent, map } from 'rxjs';
const GNBProvider = ({
    firstGnbItemRef,
    isMobile,
}: {
    firstGnbItemRef: RefObject<HTMLButtonElement>;
    isMobile: boolean;
}) => {
    const [containers, setContainers] = useState<HTMLElement[]>([]);
    const [container, setContainer] = useState<HTMLElement>();
    const [resizePanel, setResizePanel] = useState<HTMLElement>();
    useEffect(() => {
        // 특정 layoutName과 containerName을 통해 ref를 구독
        const subscription = getLayout('root').subscribe(layout => {
            console.log(layout);
            if (
                !layout ||
                !layout.container['bottom'] ||
                !layout.container['bottom'].current ||
                !layout.resizePanel['main'] ||
                !layout.resizePanel['main'].current
            )
                return;
            setContainers(
                Object.values(layout.container)
                    .filter(
                        (e): e is { current: HTMLElement } => e.current !== null
                    )
                    .map(e => e.current)
            );
            setContainer(layout.container['bottom'].current);
            setResizePanel(layout.resizePanel['main'].current);
        });

        // 구독 해제
        return () => subscription.unsubscribe();
    }, []);
    useEffect(() => {
        console.log('isMobile2', isMobile, firstGnbItemRef, container);
        if (!container || !firstGnbItemRef.current) return;
        console.log('isMobile', isMobile);
        if (!isMobile) {
            container.dataset.prev_grow = container.dataset.grow;
            container.dataset.grow = '0';
            container.style.flex = `0 1 0%`;
            return;
        }
        const parentSize =
            container.parentElement?.clientHeight || window.outerHeight;
        const newGrow = mathGrow(
            firstGnbItemRef.current.getBoundingClientRect().height,
            parentSize,
            containers.length
        );
        container.dataset.prev_grow = container.dataset.grow;
        container.dataset.grow = newGrow.toString();
        container.style.flex = `${newGrow} 1 0%`;
    }, [container, isMobile, firstGnbItemRef]);
    useEffect(() => {
        console.log(container, resizePanel);
        if (!container || !resizePanel) return;
        const resizePanelClickEvent = fromEvent(resizePanel, 'click');
        const subscribe = resizePanelClickEvent
            .pipe(
                buffer(resizePanelClickEvent.pipe(debounceTime(300))),
                filter(clickEventArray => clickEventArray.length >= 2),
                map(events => {
                    console.log('???', resizePanel, container);
                    if (!container || !resizePanel) return;
                    const currentGrow = getGrow(container);
                    if (currentGrow === 0) {
                        openFlex(container, containers, {
                            isResize: true,
                            openGrowImportant: mathGrow(
                                parseInt(
                                    window.getComputedStyle(container).maxWidth
                                ) || 1,
                                container.parentElement?.clientWidth ||
                                    window.outerWidth,
                                containers.length
                            ),
                        });
                    } else {
                        closeFlex(container, containers);
                    }
                })
            )
            .subscribe();
        return () => {
            subscribe.unsubscribe();
        };
    }, [container, containers]);
    return null;
};

export default GNBProvider;
