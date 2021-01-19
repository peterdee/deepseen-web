import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="container">
        <Component {...pageProps} />
      </div>
      <footer>
        This is footer
      </footer>
    </>
  );
}

export default MyApp;
