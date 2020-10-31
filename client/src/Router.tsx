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
      </Switch>
    </BrowserRouter>
  );
}
