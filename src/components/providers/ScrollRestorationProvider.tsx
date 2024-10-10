'use client';
import { useScrollRestorer } from 'next-scroll-restorer';

const ScrollRestorationProvider = () => {
    useScrollRestorer();
    return null;
};

export default ScrollRestorationProvider;
