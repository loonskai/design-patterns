import React, { useEffect } from 'react';
import { CacheProxy, API } from '../../patterns/structural/proxy/classic';
import { cacheProxy } from '../../patterns/structural/proxy/es6';

export default function ProxyPage(): JSX.Element {
  /* Classic OOP implementation */
  // const api = new CacheProxy(new API('https://jsonplaceholder.typicode.com'));

  /* ES6 Proxy */
  const api = cacheProxy(new API('https://jsonplaceholder.typicode.com'));

  useEffect(() => {
    (async () => {
      console.log(await api.request('/todos'));
      console.log(await api.request('/todos'));
      console.log(await api.request('/todos'));
      console.log(await api.request('/todos'));
    })();
  }, []);

  return (
    <div>
      <h1>Proxy</h1>
    </div>
  );
}
