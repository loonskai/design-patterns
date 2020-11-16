import { InterfaceAPI } from './classic';

export function cacheProxy(api: InterfaceAPI): InterfaceAPI {
  const cache: { [key: string]: any } = {};

  return new Proxy(api, {
    get(target, propKey) {
      if (propKey === 'request') {
        const origMethod = target[propKey];
        return function(path: string) {
          if (!cache[path]) {
            cache[path] = origMethod.call(target, path);
          }

          return cache[path];
        };
      }
    }
  });
}
