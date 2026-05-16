'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

const HIDDEN_ON = ['/auth', '/dashboard'];

export function ConditionalNavbar() {
  const pathname = usePathname();
  if (HIDDEN_ON.some(p => pathname.startsWith(p))) return null;
  return <Navbar />;
}
