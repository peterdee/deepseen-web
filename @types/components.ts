import React from 'react';

export interface ButtonProps {
  classes?: string[];
  disabled?: boolean;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  text: string;
}

export interface StyledButtonProps extends ButtonProps {
  isSubmit?: boolean;
}

export interface StyledProps {
  classes?: string[];
  disabled?: boolean;
  error?: boolean;
  name: string;
  onChange: (value: string, name?: string) => void;
  placeholder?: string;
  value: string;
}

export interface StyledInputProps extends StyledProps {
  type: string;
}
