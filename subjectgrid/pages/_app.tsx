import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app'
 
export default function App({ Component, pageProps }: AppProps) {
  return (
  <MantineProvider >
    <Component {...pageProps} />
    </MantineProvider>
  );
}