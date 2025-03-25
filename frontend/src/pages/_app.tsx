import '@/styles/globals.css';
import type { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';

import { ThemeProvider } from 'next-themes';

export type NextLayoutComponentType<P = {}> = NextComponentType<NextPageContext, any, P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as NextLayoutComponentType).getLayout || ((page:React.ReactNode) => page);
  return( 
  <ThemeProvider enableSystem attribute="class">
  {getLayout(<Component {...pageProps} />)}
  </ThemeProvider>
  )
}
