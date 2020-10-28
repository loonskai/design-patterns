import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AbstractFactoryPage from './pages/AbstractFactoryPage';

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
      </Switch>
    </BrowserRouter>
  );
}
