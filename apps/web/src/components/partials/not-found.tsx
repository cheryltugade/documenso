'use client';

import { useRouter } from 'next/navigation';

import { Trans } from '@lingui/macro';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';

export type NotFoundPartialProps = {
  children?: React.ReactNode;
};

export default function NotFoundPartial({ children }: NotFoundPartialProps) {
  const router = useRouter();

  return (
    <div className={cn('relative max-w-[100vw] overflow-hidden')}>
      <div className="absolute -inset-24 -z-10">
        <motion.div
          className="flex h-full w-full items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8, transition: { duration: 0.5, delay: 0.5 } }}
        ></motion.div>
      </div>

      <div className="container mx-auto flex h-full min-h-screen items-center px-6 py-32">
        <div>
          <p className="text-muted-foreground font-semibold">
            <Trans>404 Page not found</Trans>
          </p>

          <h1 className="mt-3 text-2xl font-bold md:text-3xl">
            <Trans>Oops! Something went wrong.</Trans>
          </h1>

          <p className="text-muted-foreground mt-4 text-sm">
            <Trans>
              The page you are looking for was moved, removed, renamed or might never have existed.
            </Trans>
          </p>

          <div className="mt-6 flex gap-x-2.5 gap-y-4 md:items-center">
            <Button
              variant="ghost"
              className="w-32"
              onClick={() => {
                void router.back();
              }}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              <Trans>Go Back</Trans>
            </Button>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
