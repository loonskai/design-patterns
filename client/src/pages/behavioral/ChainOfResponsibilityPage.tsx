import React, { useState } from 'react';
import axios from 'axios';

export default function ChainOfResponsibilityPage(): JSX.Element {
  const [data, setData] = useState('foobar');
  const [responseData, setResponseData] = useState('');

  const onDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.post('http://localhost:5001', data);
      setResponseData(response);
    } catch (error) {
      const errorData = error?.response?.data;
      setResponseData(`Error: \n${JSON.stringify(errorData, null, 2)}`);
    }
  };

  return (
    <div>
      <h1>Chain of Responsibility</h1>
      <div>
        <h2>Make a request</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="data">Data</label>
          <input id="data" type="text" value={data} onChange={onDataChange}/>
          <button type="submit">Send</button>
        </form>
        <pre>{responseData}</pre>
      </div>
    </div>
  );
}
