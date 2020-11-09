import React, { useState } from 'react';
import axios from 'axios';
import { WriteFileForm, WriteFileOptions } from '../components/pattern-pages/decorator/WriteFileForm';

const initialValues = {
  text: '',
  fileName: '',
  compress: false,
  encrypt: false
};

export default function DecoratorPage(): JSX.Element {
  const [formValues, setFormValues] = useState<WriteFileOptions>(initialValues);
  const [fileToRead, setFileToRead] = useState<string>('');
  const [textData, setTextData] = useState<string>('');

  const write = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/files', formValues);
  };

  const read = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`http://localhost:5000/files?name=${fileToRead}`);
      console.log(data);
      setTextData(data);
    } catch (error) {
      setTextData('Failed to read');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    switch (type) {
    case 'textarea':
    case 'text':
      setFormValues({ ...formValues, [name]: e.target.value });
      break;
    case 'checkbox':
      setFormValues({ ...formValues, [name]: e.target.checked });
      break;
    default: return;
    }
  };

  const handleFileToReadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileToRead(e.target.value);
  };

  return (
    <div>
      <h1>Decorator</h1>
      <WriteFileForm formValues={formValues} handleInputChange={handleInputChange} write={write} />
      <div>
        <form onSubmit={read}>
          <input type="text" onChange={handleFileToReadChange} value={fileToRead} />
          <button type="submit">Read</button>
          <pre>{textData}</pre>
        </form>
      </div>
    </div>
  );
}
