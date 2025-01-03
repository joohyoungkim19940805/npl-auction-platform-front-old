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
        const subscription = getLayout('main').subscribe(layout => {
            if (
                !layout ||
                !layout.container['lnb'] ||
                !layout.container['lnb'].current
            )
                return;
            setContainers(
                Object.values(layout.container)
                    .filter(
                        (e): e is { current: HTMLElement } => e.current !== null
                    )
                    .map(e => e.current)
            );
            setLnbContainer(layout.container['lnb'].current);
        });

        // 구독 해제
        return () => subscription.unsubscribe();
    }, []);
    useEffect(() => {
        if (!lnbContainer || containers.length === 0) return;
        const subscribe = lnbOpenSubject.subscribe(isOpenState => {
            if (!lnbContainer || containers.length === 0) return;
            const currentGrow = getGrow(lnbContainer);
            if (currentGrow === 0 || isOpenState) {
                openFlex(lnbContainer, containers, {
                    isResize: !isMobile,
                    openGrowImportant: mathGrow(
                        parseInt(
                            window.getComputedStyle(lnbContainer).maxWidth
                        ) || 1,
                        lnbContainer.parentElement?.clientWidth ||
                            window.outerWidth,
                        containers.length
                    ),
                });
            } else {
                closeFlex(lnbContainer, containers);
            }
            // if (window.location.hash == '#menu-open' && currentGrow == 0) {
            //     history.replaceState(
            //         null,
            //         '',
            //         location.origin +
            //             location.pathname +
            //             location.search +
            //             window.location.hash
            //     );
            //     openFlex(lnbContainer, containers, {
            //         isResize: !isMobile,
            //         openGrowImportant: mathGrow(
            //             parseInt(
            //                 window.getComputedStyle(lnbContainer).maxWidth
            //             ),
            //             lnbContainer.parentElement?.clientWidth ||
            //                 window.outerWidth,
            //             containers.length
            //         ),
            //     });
            //     lnbContainer.setAttribute('data-open', '');
            // } else if ((!isOpenState && currentGrow === 0) || isOpenState) {
            //     window.location.hash = '#menu-open';
            // } else if (window.location.hash == '#menu-open') {
            //     window.history.back();
            // } else {
            //     closeFlex(lnbContainer, containers);
            //     lnbContainer.removeAttribute('data-open');
            // }
        });
        // 뒤로가기시 메뉴가 열려있는 경우 메뉴가 자동으로 열리도록 하는 것은 사용성이 너무 좋지 않음
        // if (window.location.hash == '#menu-open') {
        //     openFlex(lnbContainer, containers, {
        //         isResize: !isMobile,
        //         openGrowImportant: mathGrow(
        //             parseInt(window.getComputedStyle(lnbContainer).maxWidth),
        //             lnbContainer.parentElement?.clientWidth ||
        //                 window.outerWidth,
        //             containers.length
        //         ),
        //     });
        //     //window.location.hash = '#menu-open';
        // }
        /*
         */
        return () => {
            subscribe.unsubscribe();
        };
    }, [lnbContainer, containers, isMobile]);
    // useEffect(() => {
    //     //특정 hash가 추가될 때 open or close
    //     const hashChangeSubscription = windowHashChange.subscribe(
    //         ([newHash, oldHash]) => {
    //             if (!lnbContainer) return;
    //             if (newHash == 'menu-open') {
    //                 openFlex(lnbContainer, containers, {
    //                     isResize: !isMobile,
    //                     openGrowImportant: mathGrow(
    //                         parseInt(
    //                             window.getComputedStyle(lnbContainer).maxWidth
    //                         ),
    //                         lnbContainer.parentElement?.clientWidth ||
    //                             window.outerWidth,
    //                         containers.length
    //                     ),
    //                 });

    //                 lnbContainer.setAttribute('data-open', '');
    //             } else if (oldHash == 'menu-open') {
    //                 closeFlex(lnbContainer, containers);
    //                 lnbContainer.removeAttribute('data-open');
    //             }
    //         }
    //     );
    //     return () => {
    //         hashChangeSubscription.unsubscribe();
    //     };
    // }, [router, lnbContainer, containers]);

    return null;
};
export default SidebarProvider;
