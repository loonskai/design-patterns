import React from 'react';
import { Route } from 'react-router-dom';
import './PageRoute.css';

type Props = {
  path: string;
  children: React.ReactNode
}

export default function PageRoute({ path, children }: Props): JSX.Element {
  return (
    <Route path={path} exact>
      <main className="content">
        {children}
      </main>
    </Route>
  );
}
