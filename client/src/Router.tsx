import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AbstractFactoryPage from './pages/AbstractFactoryPage';
import BuilderPage from './pages/BuilderPage';
import SingletonPage from './pages/SingletonPage';
import AdapterPage from './pages/AdapterPage';
import BridgePage from './pages/BridgePage';
import DecoratorPage from './pages/DecoratorPage';
import FacadePage from './pages/FacadePage';
import FlyweightPage from './pages/FlyweightPage';
import ProxyPage from './pages/ProxyPage';
import ChainOfResponsibilityPage from './pages/ChainOfResponsibilityPage';

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/abstract-factory" exact>
          <AbstractFactoryPage />
        </Route>
        <Route path="/builder">
          <BuilderPage />
        </Route>
        <Route path="/singleton">
          <SingletonPage />
        </Route>
        <Route path="/adapter">
          <AdapterPage />
        </Route>
        <Route path="/bridge">
          <BridgePage />
        </Route>
        <Route path="/decorator">
          <DecoratorPage />
        </Route>
        <Route path="/facade">
          <FacadePage />
        </Route>
        <Route path="/flyweight">
          <FlyweightPage />
        </Route>
        <Route path="/proxy">
          <ProxyPage />
        </Route>
        <Route path="/chain-of-responsibility">
          <ChainOfResponsibilityPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
