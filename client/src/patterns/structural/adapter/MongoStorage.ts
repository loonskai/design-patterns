import axios from 'axios';

export class MongoStorage {
  async post(data: string): Promise<void> {
    try {
      await axios.post('http://localhost:5000/todos', { value: data });
    } catch (err) {
      console.error(err);
    }
  }
  
  async fetchAll(): Promise<string[]> {
    try {
      const { data } = await axios.get('http://localhost:5000/todos');
      return data.map(({ value }: { value: string }) => value);
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}
