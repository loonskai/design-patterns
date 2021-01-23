import React from 'react';
import { ElementStyleBuilder } from '../../patterns/creational/builder';

export default function BuilderPage(): JSX.Element {
  const style = new ElementStyleBuilder()
    .setSize({
      width: 300,
      height: 300
    })
    .setBackground('red')
    .setBorder('3px solid black')
    .build();

  return (
    <div>
      <h1>Builder</h1>
      <div style={style} />
    </div>
  );
}
