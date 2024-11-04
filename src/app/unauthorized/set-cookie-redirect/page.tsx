'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function SetCookieRedirect() {
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const redirectUri = searchParams.get('redirect_uri');
        if (redirectUri) {
            router.replace(redirectUri); // 최종 목적지로 리다이렉트
        }
    }, [searchParams, router]);

    return null; // 사용자에게 아무것도 표시되지 않음
}
