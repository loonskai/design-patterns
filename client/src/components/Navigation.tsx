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
            <li className="navigation-link">
              <NavLink to="/factory-method">Factory Method</NavLink>
            </li>
            <li className="navigation-link navigation-link__in-progress">
              <NavLink to="/abstract-factory">Abstract Factory</NavLink>
            </li>
            <li className="navigation-link">
              <NavLink to="/builder">Builder</NavLink>
            </li>
            <li className="navigation-link">
              <NavLink to="/singleton">Singleton</NavLink>
            </li>
          </ul>
        </div>
        <div>
            Structural patterns
          <ul>
            <li className="navigation-link">
              <NavLink to="/adapter">Adapter</NavLink>
            </li>
            <li className="navigation-link">
              <NavLink to="/bridge">Bridge</NavLink>
            </li>
            <li className="navigation-link navigation-link__todo">
              <NavLink to="/composite">Composite</NavLink>
            </li>
            <li className="navigation-link">
              <NavLink to="/decorator">Decorator</NavLink>
            </li>
            <li className="navigation-link navigation-link__todo">
              <NavLink to="/facade">Facade</NavLink>
            </li>
            <li className="navigation-link">
              <NavLink to="/flyweight">Flyweight</NavLink>
            </li>
            <li className="navigation-link">
              <NavLink to="/proxy">Proxy</NavLink>
            </li>
          </ul>
        </div>
        <div>
            Behavioral patterns
          <ul>
            <li className="navigation-link">
              <NavLink to="/chain-of-responsibility">Chain of Responsibility</NavLink>
            </li>
            <li className="navigation-link navigation-link__in-progress">
              <NavLink to="/command">Command</NavLink>
            </li>
            <li className="navigation-link navigation-link__todo">
              <NavLink to="/iterator">Iterator</NavLink>
            </li>
            <li className="navigation-link navigation-link__todo">
              <NavLink to="/mediator">Mediator</NavLink>
            </li>
            <li className="navigation-link navigation-link__todo">
              <NavLink to="/memento">Memento</NavLink>
            </li>
            <li className="navigation-link navigation-link__todo">
              <NavLink to="/observer">Observer</NavLink>
            </li>
            <li className="navigation-link navigation-link__todo">
              <NavLink to="/state">State</NavLink>
            </li>
            <li className="navigation-link navigation-link__todo">
              <NavLink to="/strategy">Strategy</NavLink>
            </li>
            <li className="navigation-link navigation-link__todo">
              <NavLink to="/template-method">Template Method</NavLink>
            </li>
            <li className="navigation-link navigation-link__todo">
              <NavLink to="/visitor">Visitor</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
