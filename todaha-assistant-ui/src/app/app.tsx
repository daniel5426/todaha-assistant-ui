'use client';

import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { Theme, useTheme } from '@/components/daisyui';
import configureFakeBackend from '@/services/api/fake-backend';
import Router from '@/services/routes/Router';
import { AuthContextProvider } from '@/states/auth';
import { LayoutContextProvider } from '@/states/layout';
import React from 'react';

configureFakeBackend();

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
      <Theme dataTheme={theme}>
        <LayoutContextProvider>
          <AuthContextProvider>
            {children}
            <Toaster richColors />
          </AuthContextProvider>
        </LayoutContextProvider>
      </Theme>
  );
};

export default ClientProviders;
