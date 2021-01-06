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
          <li><NavLink to="/singleton">Singleton</NavLink></li>
          <li><NavLink to="/adapter">Adapter</NavLink></li>
          <li><NavLink to="/bridge">Bridge</NavLink></li>
          <li><NavLink to="/decorator">Decorator</NavLink></li>
          <li><NavLink to="/facade">Facade</NavLink></li>
          <li><NavLink to="/flyweight">Flyweight</NavLink></li>
          <li><NavLink to="/proxy">Proxy</NavLink></li>
          <li><NavLink to="/chain-of-responsibility">Chain of Responsibility</NavLink></li>
          <li><NavLink to="/command">Command</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
