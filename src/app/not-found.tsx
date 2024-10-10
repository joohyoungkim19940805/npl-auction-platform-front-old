'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>페이지를 찾을 수 없습니다.</h1>
                <p>요청하신 페이지가 존재하지 않거나 삭제되었습니다.</p>
                <button
                    onClick={() => router.push('/')}
                    style={{ marginTop: '20px' }}
                >
                    홈으로 돌아가기
                </button>
            </div>
        </>
    );
}
