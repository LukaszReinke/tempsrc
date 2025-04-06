'use client';

import { Navbar, Footer, LoaderWrapper } from '@hd/components';
import './globals.css';
import { FOOTER_HEIGHT, NAV_HEIGHT } from '@hd/consts/Heights';
import { ToastProvider, UserProvider } from '@hd/context';
import { TransitionProvider } from '@hd/context';
import { PROTECTED_ROUTE } from '@hd/consts';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith(PROTECTED_ROUTE);

  const mainMinHeight = `calc(100vh - ${NAV_HEIGHT} - ${FOOTER_HEIGHT})`;
  const authedMinHeight = `calc(100vh - ${FOOTER_HEIGHT})`;

  return (
    <html lang="en">
      <body className="bg-zinc-950" suppressHydrationWarning>
        <LoaderWrapper>
          <UserProvider>
            <TransitionProvider content={!isAuthRoute && <Navbar />}>
              <ToastProvider>
                <div style={{ minHeight: isAuthRoute ? authedMinHeight : mainMinHeight }}>
                  {children}
                </div>
              </ToastProvider>
              <Footer />
            </TransitionProvider>
          </UserProvider>
        </LoaderWrapper>
      </body>
    </html>
  );
}
