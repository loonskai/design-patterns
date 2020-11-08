import React from 'react';

export type GeneratedUserOptions = {
  firstName?: string
  randomFirstName?: boolean
  lastName?: string
  randomLastName?: boolean
  email?: string
  randomEmail?: boolean
  password?: string
  randomPassword?: boolean
}

type Props = {
  generateUser(event: React.FormEvent<HTMLFormElement>): void
  handleInputChange(event: React.FormEvent<FormItemElement>): void
  formValues: GeneratedUserOptions
}

export type FormItemElement = HTMLInputElement

export const UserGeneratorForm = ({ handleInputChange, generateUser, formValues }: Props): JSX.Element => {
  return <form onSubmit={generateUser}>
    <div>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" name="firstName" onChange={handleInputChange} value={formValues.firstName} disabled={formValues.randomFirstName}/>
      <label htmlFor="randomFirstName">Random First Name</label>
      <input id="randomFirstName" name="randomFirstName" onChange={handleInputChange} type="checkbox" checked={formValues.randomFirstName} />
    </div>
    <div>
      <label htmlFor="lastName">Last Name:</label>
      <input type="text" name="lastName" onChange={handleInputChange} value={formValues.lastName} disabled={formValues.randomLastName}/>
      <label htmlFor="randomLastName">Random Last Name</label>
      <input id="randomLastName" name="randomLastName" onChange={handleInputChange} type="checkbox" checked={formValues.randomLastName} />
    </div>
    <div>
      <label htmlFor="email">Email:</label>
      <input type="text" name="email" onChange={handleInputChange} value={formValues.email} disabled={formValues.randomEmail} />
      <label htmlFor="randomEmail">Random email</label>
      <input id="randomEmail" name="randomEmail" onChange={handleInputChange} type="checkbox" checked={formValues.randomEmail} />
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <input type="text" name="password" onChange={handleInputChange} value={formValues.password} disabled={formValues.randomPassword} />
      <label htmlFor="randomPassword">Random password</label>
      <input id="randomPassword" name="randomPassword" onChange={handleInputChange} type="checkbox" checked={formValues.randomPassword} />
    </div>
    <button>Generate</button>
  </form>;
};
