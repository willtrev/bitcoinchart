import React, { ButtonHTMLAttributes } from 'react';

import { Button } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const CurrencyButton: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Button type="button" {...rest}>{children}</Button>
);

export default CurrencyButton;

