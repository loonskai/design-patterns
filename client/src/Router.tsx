import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import PageRoute from './pages/PageRoute';
import AbstractFactoryPage from './pages/creational/AbstractFactoryPage';
import BuilderPage from './pages/creational/BuilderPage';
import SingletonPage from './pages/creational/SingletonPage';
import AdapterPage from './pages/structural/AdapterPage';
import BridgePage from './pages/structural/BridgePage';
import DecoratorPage from './pages/structural/DecoratorPage';
import FacadePage from './pages/structural/FacadePage';
import FlyweightPage from './pages/structural/FlyweightPage';
import ProxyPage from './pages/structural/ProxyPage';
import ChainOfResponsibilityPage from './pages/behavioral/ChainOfResponsibilityPage';
import CommandPage from './pages/behavioral/CommandPage';
import IteratorPage from './pages/behavioral/IteratorPage';
import MediatorPage from './pages/behavioral/MediatorPage';
import MementoPage from './pages/behavioral/MementoPage';
import ObserverPage from './pages/behavioral/ObserverPage';
import StatePage from './pages/behavioral/StatePage';
import StrategyPage from './pages/behavioral/StrategyPage';
import TemplateMethodPage from './pages/behavioral/TemplateMethodPage';
import VisitorPage from './pages/behavioral/VisitorPage';

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <PageRoute path="/abstract-factory">
          <AbstractFactoryPage />
        </PageRoute>
        <PageRoute path="/builder">
          <BuilderPage />
        </PageRoute>
        <PageRoute path="/singleton">
          <SingletonPage />
        </PageRoute>
        <PageRoute path="/adapter">
          <AdapterPage />
        </PageRoute>
        <PageRoute path="/bridge">
          <BridgePage />
        </PageRoute>
        <PageRoute path="/decorator">
          <DecoratorPage />
        </PageRoute>
        <PageRoute path="/facade">
          <FacadePage />
        </PageRoute>
        <PageRoute path="/flyweight">
          <FlyweightPage />
        </PageRoute>
        <PageRoute path="/proxy">
          <ProxyPage />
        </PageRoute>
        <PageRoute path="/chain-of-responsibility">
          <ChainOfResponsibilityPage />
        </PageRoute>
        <PageRoute path="/command">
          <CommandPage />
        </PageRoute>
        <PageRoute path="/iterator">
          <IteratorPage />
        </PageRoute>
        <PageRoute path="/mediator">
          <MediatorPage />
        </PageRoute>
        <PageRoute path="/memento">
          <MementoPage />
        </PageRoute>
        <PageRoute path="/observer">
          <ObserverPage />
        </PageRoute>
        <PageRoute path="/state">
          <StatePage />
        </PageRoute>
        <PageRoute path="/strategy">
          <StrategyPage />
        </PageRoute>
        <PageRoute path="/template-method">
          <TemplateMethodPage />
        </PageRoute>
        <PageRoute path="/visitor">
          <VisitorPage />
        </PageRoute>
      </Switch>
    </BrowserRouter>
  );
}
