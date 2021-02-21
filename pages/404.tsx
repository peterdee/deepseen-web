import React, { memo } from 'react';
import { useRouter } from 'next/router';

import LinkButton from '@/components/LinkButton';
import styles from '@/styles/Index.module.css';

function NotFound(): React.ReactElement {
  const router = useRouter();

  return (
    <div className={`centered ${styles.notFound}`}>
      <h1 className="text-center">
        Page not found!
      </h1>
      <LinkButton
        classes={['mt-16']}
        onClick={() => router.push('/')}
        text="Back"
      />
    </div>
  );
}

export default memo(NotFound);
