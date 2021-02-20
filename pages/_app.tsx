import React from 'react';
import type { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
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
