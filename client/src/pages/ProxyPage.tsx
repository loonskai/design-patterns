import React, { useEffect } from 'react';
import { CacheProxy, API } from '../patterns/structural/proxy/classic';

export default function ProxyPage(): JSX.Element {
  const api = new CacheProxy(new API('https://jsonplaceholder.typicode.com'));

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
