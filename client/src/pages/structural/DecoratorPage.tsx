import React, { useState } from 'react';
import axios from 'axios';
import { WriteFileForm, WriteFileOptions } from '../../components/pattern-pages/decorator/WriteFileForm';

const initialValues = {
  text: '',
  fileName: '',
  compress: false,
  encrypt: false
};

export default function DecoratorPage(): JSX.Element {
  const [formValues, setFormValues] = useState<WriteFileOptions>(initialValues);

  const write = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/files', formValues);
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
      <WriteFileForm formValues={formValues} handleInputChange={handleInputChange} write={write} />
    </div>
  );
}
