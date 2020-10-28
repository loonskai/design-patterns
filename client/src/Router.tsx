import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';

export default function Router(): JSX.Element {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
