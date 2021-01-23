import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation(): JSX.Element {
  return (
    <header className="navigation">
      <nav>
        <div>
            Creational patterns
          <ul>
            <li><NavLink to="/abstract-factory">Abstract Factory</NavLink></li>
            <li><NavLink to="/builder">Builder</NavLink></li>
            <li><NavLink to="/singleton">Singleton</NavLink></li>
          </ul>
        </div>
        <div>
            Structural patterns
          <ul>
            <li><NavLink to="/adapter">Adapter</NavLink></li>
            <li><NavLink to="/bridge">Bridge</NavLink></li>
            <li><NavLink to="/decorator">Decorator</NavLink></li>
            <li><NavLink to="/facade">Facade</NavLink></li>
            <li><NavLink to="/flyweight">Flyweight</NavLink></li>
            <li><NavLink to="/proxy">Proxy</NavLink></li>
          </ul>
        </div>
        <div>
            Behavioral patterns
          <ul>
            <li><NavLink to="/chain-of-responsibility">Chain of Responsibility</NavLink></li>
            <li><NavLink to="/command">Command</NavLink></li>
            <li><NavLink to="/iterator">Iterator</NavLink></li>
            <li><NavLink to="/mediator">Mediator</NavLink></li>
            <li><NavLink to="/memento">Memento</NavLink></li>
            <li><NavLink to="/observer">Observer</NavLink></li>
            <li><NavLink to="/state">State</NavLink></li>
            <li><NavLink to="/strategy">Strategy</NavLink></li>
            <li><NavLink to="/template-method">Template Method</NavLink></li>
            <li><NavLink to="/visitor">Visitor</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
