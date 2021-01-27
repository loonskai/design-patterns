import React from 'react';
import { ElementStyleBuilder } from '../../patterns/creational/builder';

export default function BuilderPage(): JSX.Element {
  const styleFirst = new ElementStyleBuilder()
    .setSize({ width: 200, height: 100 })
    .setBackground('#B34940')
    .setUserAgentStyles()
    .build();

  const styleSecond = new ElementStyleBuilder()
    .setSize({ width: 100, height: 40 })
    .setBackground('#FFFFFF')
    .setBorder('3px solid #54B6B9')
    .setUserAgentStyles()
    .build();

  return (
    <div>
      <h1>Builder</h1>
      <button style={styleFirst}>First Button</button>
      <button style={styleSecond}>Second Button</button>
    </div>
  );
}
