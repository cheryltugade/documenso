import React from 'react';

import { setupI18nSSR } from '@documenso/lib/client-only/providers/i18n.server';

type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
};

export default async function UnauthenticatedLayout({ children }: UnauthenticatedLayoutProps) {
  await setupI18nSSR();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 md:p-12 lg:p-24">
      <div>
        <div className="absolute -inset-[min(600px,max(400px,60vw))] -z-[1] flex items-center justify-center opacity-70"></div>

        <div className="relative w-full">{children}</div>
      </div>
    </main>
  );
}
