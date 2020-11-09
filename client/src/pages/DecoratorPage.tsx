import React, { useState } from 'react';
import axios from 'axios';
import { TextFileForm, TextFileOptions } from '../components/pattern-pages/decorator/TextFileForm';


const initialValues = {
  text: '',
  fileName: '',
  compress: false,
  encrypt: false
};

export default function DecoratorPage(): JSX.Element {
  const [formValues, setFormValues] = useState<TextFileOptions>(initialValues);
  const [generated, setGenerated] = useState<string>('');

  const generateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:5000/user-generate', formValues);
    setGenerated(JSON.stringify(data, null, 2));
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

  return (
    <div>
      <h1>Decorator</h1>
      <TextFileForm formValues={formValues} handleInputChange={handleInputChange} generateUser={generateUser} />
      <div>
        Result:
        <pre>{generated}</pre>
      </div>
    </div>
  );
}
