import React from 'react';

import { ChangePasswordFormProps } from '@/@types/forms';
import StyledButton from '@/components/StyledButton';
import StyledInput from '@/components/StyledInput';
import styles from '@/styles/Home.module.css';

export default function ChangePasswordForm(props: ChangePasswordFormProps): React.ReactElement {
  const {
    confirmNewPassword,
    confirmNewPasswordError,
    formError,
    handleInput,
    handleSubmit,
    loading,
    newPassword,
    newPasswordError,
    oldPassword,
    oldPasswordError,
    passwordUpdated,
  } = props;

  return (
    <form
      className="flex direction-column col-xs-12 col-sm-12 col-md-8 col-lg-6"
      onSubmit={handleSubmit}
    >
      <StyledInput
        classes={['w100']}
        disabled={loading}
        error={oldPasswordError}
        name="oldPassword"
        onChange={handleInput}
        placeholder="Old Password"
        type="password"
        value={oldPassword}
      />
      <StyledInput
        classes={['w100']}
        disabled={loading}
        error={newPasswordError}
        name="newPassword"
        onChange={handleInput}
        placeholder="New Password"
        type="password"
        value={newPassword}
      />
      <StyledInput
        classes={['w100']}
        disabled={loading}
        error={confirmNewPasswordError}
        name="confirmNewPassword"
        onChange={handleInput}
        placeholder="Confirm New Password"
        type="password"
        value={confirmNewPassword}
      />
      { passwordUpdated && (
        <div className={`${styles.homeSuccessContainer} noselect`}>
          { passwordUpdated }
        </div>
      ) }
      { !passwordUpdated && (
        <div className={`${styles.homeErrorContainer} noselect`}>
          { formError }
        </div>
      ) }
      <StyledButton
        disabled={loading}
        isSubmit
        text="SUBMIT"
      />
    </form>
  );
}
