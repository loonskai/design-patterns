import React from 'react';

type Props = {
  text?: string
  onClick?(event: React.MouseEvent): void;
}

export type FormItemElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const WinButton = ({ text, onClick }: Props): JSX.Element => {
  return <button onClick={onClick}>{text}</button>;
};

export default WinButton;
