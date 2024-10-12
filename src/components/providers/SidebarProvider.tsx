'use client';
import { getLayout } from '@/components/flexLayout/FlexLayoutContainerStore';
import {
    closeFlex,
    getGrow,
    mathGrow,
    openFlex,
} from '@/components/flexLayout/FlexLayoutUtils';
import { lnbOpenSubject } from '@/handler/subject/LnbSubject';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/system';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { documentReady, windowHashChange } from '@/handler/globalEvents';
import { filter, map } from 'rxjs';

const SidebarProvider = ({ isSsrMobile }: { isSsrMobile: boolean }) => {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'), {
        defaultMatches: isSsrMobile,
    }); // 모바일 화면 여부 판단
    const [containers, setContainers] = useState<HTMLElement[]>([]);
    const [lnbContainer, setLnbContainer] = useState<HTMLElement>();
    const router = useRouter();
    const pathname = usePathname(); // 현재 경로 가져오기
    useEffect(() => {
        // 특정 layoutName과 containerName을 통해 ref를 구독
        const subscription = getLayout('main').subscribe(ref => {
            if (!ref || !ref['lnb'].current) return;
            setContainers(
                Object.values(ref)
                    .filter(
                        (e): e is { current: HTMLElement } => e.current !== null
                    )
                    .map(e => e.current)
            );
            setLnbContainer(ref['lnb'].current);
        });

        // 구독 해제
        return () => subscription.unsubscribe();
    }, []);
    useEffect(() => {
        if (!lnbContainer || containers.length === 0) return;
        const subscribe = lnbOpenSubject.subscribe(isOpenState => {
            if (!lnbContainer || containers.length === 0) return;
            const currentGrow = getGrow(lnbContainer);
            if (window.location.hash == '#menu-open' && currentGrow == 0) {
                openFlex(lnbContainer, containers, {
                    isResize: !isMobile,
                    openGrowImportant: mathGrow(
                        parseInt(
                            window.getComputedStyle(lnbContainer).maxWidth
                        ),
                        lnbContainer.parentElement?.clientWidth ||
                            window.outerWidth,
                        containers.length
                    ),
                });
                //window.location.hash = '#menu-open';
            } else if ((!isOpenState && currentGrow === 0) || isOpenState) {
                window.location.hash = '#menu-open';
            } else if (window.location.hash == '#menu-open') {
                window.history.back();
            } else {
                closeFlex(lnbContainer, containers);
            }
        });
        if (window.location.hash == '#menu-open') {
            openFlex(lnbContainer, containers, {
                isResize: !isMobile,
                openGrowImportant: mathGrow(
                    parseInt(window.getComputedStyle(lnbContainer).maxWidth),
                    lnbContainer.parentElement?.clientWidth ||
                        window.outerWidth,
                    containers.length
                ),
            });
            //window.location.hash = '#menu-open';
        }
        /*
         */
        return () => {
            subscribe.unsubscribe();
        };
    }, [lnbContainer, containers]);
    useEffect(() => {
        const hashChangeSubscription = windowHashChange.subscribe(
            ([newHash, oldHash]) => {
                if (!lnbContainer) return;
                if (newHash == 'menu-open') {
                    openFlex(lnbContainer, containers, {
                        isResize: !isMobile,
                        openGrowImportant: mathGrow(
                            parseInt(
                                window.getComputedStyle(lnbContainer).maxWidth
                            ),
                            lnbContainer.parentElement?.clientWidth ||
                                window.outerWidth,
                            containers.length
                        ),
                    });
                } else if (oldHash == 'menu-open') {
                    closeFlex(lnbContainer, containers);
                }
            }
        );
        return () => {
            hashChangeSubscription.unsubscribe();
        };
    }, [router, lnbContainer, containers]);

    return null;
};
export default SidebarProvider;
