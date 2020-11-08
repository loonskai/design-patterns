import React, { useState } from 'react';
import axios from 'axios';
import { UserGeneratorForm, GeneratedUserOptions, FormItemElement } from '../components/pattern-pages/decorator/UserGeneratorForm';


const initialValues = {
  firstName: '',
  randomFirstName: false,
  lastName: '',
  randomLastName: false,
  email: '',
  randomEmail: true,
  password: '',
  randomPassword: true
};

export default function DecoratorPage(): JSX.Element {
  const [formValues, setFormValues] = useState<GeneratedUserOptions>(initialValues);
  const [generated, setGenerated] = useState<string>('');

  const generateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:5000/user-generate', formValues);
    setGenerated(JSON.stringify(data, null, 2));
  };

  const handleInputChange = (e: React.ChangeEvent<FormItemElement>) => {
    const { name, value, checked } = e.target;
    const newValue = name.includes('random') ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  return (
    <div>
      <h1>Decorator</h1>
      <h3>Generate user info</h3>
      <UserGeneratorForm formValues={formValues} handleInputChange={handleInputChange} generateUser={generateUser} />
      <div>
        Result:
        <pre>{generated}</pre>
      </div>
    </div>
  );
}
