import { windowResize } from '@/handler/globalEvents';

import { useEffect, useRef, useState } from 'react';

export const useSize = (sizeName: 'height' | 'width') => {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<number>();
    useEffect(() => {
        if (!ref.current) return;
        setSize(ref.current.getBoundingClientRect()[sizeName as keyof DOMRect]);
    }, [sizeName]);
    useEffect(() => {
        if (!ref.current) return;

        const childrenChangeObserver = new MutationObserver(
            (mutationList, observer) => {
                mutationList.forEach(mutation => {
                    if (!ref.current || !size) return;
                    const newSize =
                        ref.current.getBoundingClientRect()[
                            sizeName as keyof DOMRect
                        ];
                    if (
                        newSize === size ||
                        Math.abs((newSize as number) - size) < 5
                    )
                        return;
                    setSize(newSize);
                });
            }
        );
        childrenChangeObserver.observe(ref.current, {
            childList: true,
            subtree: true,
        });

        const subscribe = windowResize.subscribe(ev => {
            if (!ref.current) return;
            setSize(
                ref.current.getBoundingClientRect()[sizeName as keyof DOMRect]
            );
        });
        return () => {
            subscribe.unsubscribe();
            //childrenChangeObserver.disconnect();
        };
    }, [size, sizeName]);

    return { ref, size };
};
export const useFirstChildSize = (sizeName: string) => {
    const ref = useRef<HTMLDivElement>(null);
    const [sizes, setSizes] = useState<Array<number>>();
    useEffect(() => {
        if (!ref.current || !ref.current.children[0]) return;
        if (!sizes || sizes.length === 0) {
            setSizes([
                ref.current.getBoundingClientRect()[
                    sizeName as keyof DOMRect
                ] as number,
                ref.current.children[0].getBoundingClientRect()[
                    sizeName as keyof DOMRect
                ] as number,
            ]);
        }
    }, []);
    useEffect(() => {
        if (!ref.current || !ref.current.children[0]) return;
        const childrenChangeObserver = new MutationObserver(
            (mutationList, observer) => {
                mutationList.forEach(mutation => {
                    if (!ref.current || !sizes || !ref.current.children[0])
                        return;
                    const newSize = ref.current.getBoundingClientRect()[
                        sizeName as keyof DOMRect
                    ] as number;
                    //if (newSize === sizes[0]) return;
                    setSizes([
                        newSize,
                        ref.current.children[0].getBoundingClientRect()[
                            sizeName as keyof DOMRect
                        ] as number,
                    ]);
                });
            }
        );
        childrenChangeObserver.observe(ref.current, {
            childList: true,
            subtree: true,
        });

        const subscribe = windowResize.subscribe(ev => {
            if (!ref.current || !ref.current.children[0]) return;
            setSizes([
                ref.current.getBoundingClientRect()[
                    sizeName as keyof DOMRect
                ] as number,
                ref.current.children[0].getBoundingClientRect()[
                    sizeName as keyof DOMRect
                ] as number,
            ]);
        });
        return () => {
            subscribe.unsubscribe();
            childrenChangeObserver.disconnect();
        };
    }, [sizeName, sizes]);
    return { ref, sizes };
};
