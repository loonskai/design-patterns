import axios from 'axios';

export interface InterfaceAPI {
  request(path: string | number | symbol): void
}

export class API implements InterfaceAPI {
  private hostname: string;

  constructor(hostname: string) {
    this.hostname = hostname;
  }

  async request(path: string): Promise<void> {
    const res = await axios.get(`${this.hostname}${path}`);
    return res.data;
  }
}

export class CacheProxy implements InterfaceAPI {
  private api: InterfaceAPI;

  private cache: { [key: string]: any } = {};

  constructor(api: InterfaceAPI) {
    this.api = api;
  }

  async request(path: string): Promise<void> {
    if (!this.cache[path]) {
      this.cache[path] = await this.api.request(path);
    }

    return this.cache[path];
  }
}
