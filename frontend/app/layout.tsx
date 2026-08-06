import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Providers } from './providers';
import './globals.css';
export const metadata: Metadata = { title: 'Exchange Mony', description: 'Authenticated Excel currency conversion SaaS' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><Providers>{children}<Toaster richColors position="top-right" /></Providers></body></html>; }
