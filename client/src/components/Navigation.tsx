import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation(): JSX.Element {
  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/abstract-factory">Abstract Factory</NavLink></li>
          <li><NavLink to="/builder">Builder</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
