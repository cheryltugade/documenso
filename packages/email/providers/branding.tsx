'use client';

import { createContext, useContext } from 'react';

type BrandingContextValue = {
  brandingEnabled: boolean;
  brandingUrl: string;
  brandingLogo: string;
  brandingCompanyDetails: string;
  brandingHidePoweredBy: boolean;
};

const BrandingContext = createContext<BrandingContextValue | undefined>(undefined);

const defaultBrandingContextValue: BrandingContextValue = {
  brandingEnabled: true,
  brandingUrl: '',
  brandingLogo: '/static/logo-glenwood.png',
  brandingCompanyDetails: '',
  brandingHidePoweredBy: true,
};

export const BrandingProvider = (props: {
  branding?: BrandingContextValue;
  children: React.ReactNode;
}) => {
  return (
    <BrandingContext.Provider value={props.branding ?? defaultBrandingContextValue}>
      {props.children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => {
  const ctx = useContext(BrandingContext);

  if (!ctx) {
    throw new Error('Branding context not found');
  }

  return ctx;
};

export type BrandingSettings = BrandingContextValue;
