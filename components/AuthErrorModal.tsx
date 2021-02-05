import React, { memo } from 'react';

import LinkButton from './LinkButton';
import ModalWrap from './ModalWrap';

interface ErrorModalProps {
  closeModal: () => void;
  message: string;
}

function ErrorModal({ closeModal, message }: ErrorModalProps): React.ReactElement {
  return (
    <ModalWrap>
      <>
        <div>
          { message }
        </div>
        <LinkButton
          classes={['mt-16']}
          onClick={closeModal}
          text="Close"
        />
      </>
    </ModalWrap>
  );
}

export default memo(ErrorModal);
