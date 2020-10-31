import axios from 'axios';

export class MongoStorage {
  constructor() {}

  async post(data: string): Promise<void> {
    await axios.post('http://localhost:5000/todos', { value: data });
  }

  async fetchAll(): Promise<string[]> {
    const { data } = await axios.get('http://localhost:5000/todos');
    return data;
  }
}
