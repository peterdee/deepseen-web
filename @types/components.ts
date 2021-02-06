import React from 'react';

export interface ButtonProps {
  classes?: string[];
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  text: string;
}

export interface StyledButtonProps extends ButtonProps {
  isSubmit?: boolean;
}

export interface StyledInputProps {
  disabled?: boolean;
  error?: boolean;
  name: string;
  onChange: (value: string, name?: string) => void;
  placeholder?: string;
  type: string;
  value: string;
}
