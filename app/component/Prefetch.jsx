"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

function Prefetch() {
    const router = useRouter();

    useEffect(() => {
      router.prefetch('/account');
      router.prefetch('/leaderboard');
      router.prefetch('/dashboard'); // if you have one
    }, []);
    return null;
 
}

export default Prefetch