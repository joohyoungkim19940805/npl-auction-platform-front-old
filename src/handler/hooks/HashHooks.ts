'use client';
import { windowHashChange } from '@/handler/globalEvents';
import { useState, useEffect } from 'react';

export function useHash(): [string, (newHash: string) => void] {
    const [hash, setHash] = useState(() =>
        typeof window !== 'undefined' ? window.location.hash : ''
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const subscribe = windowHashChange.subscribe(([newURL, oldURL]) => {
            if (newURL === oldURL) return;
            setHash(newURL);
        });
        return () => {
            subscribe.unsubscribe();
        };
    }, []);

    const updateHash = (newHash: string) => {
        if (newHash !== hash) {
            window.location.hash = newHash;
        }
    };

    return [hash, updateHash];
}
