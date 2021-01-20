import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="container">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
