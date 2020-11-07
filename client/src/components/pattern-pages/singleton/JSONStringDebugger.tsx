import React from 'react';

type Props = {
  name?: string;
  data: JSON;
}

export const JSONStringDebugger = ({ name, data }: Props): JSX.Element => (
  <p>
    <strong>{name}</strong>
    <pre>{JSON.stringify(data)}</pre>
  </p>
);
