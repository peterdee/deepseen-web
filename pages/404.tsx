import React from 'react';
import { useRouter } from 'next/router';

import LinkButton from '../components/LinkButton';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="centered">
      <h1>Page not found!</h1>
      <LinkButton
        classes={['mt-16']}
        onClick={() => router.push('/')}
        text="Back"
      />
    </div>
  );
}
