import React from 'react';

export type TextFileOptions = {
  text: string
  fileName: string
  compress?: boolean
  encrypt?: boolean
}

type Props = {
  generateUser(event: React.FormEvent<HTMLFormElement>): void
  handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  formValues: TextFileOptions
}

export const TextFileForm = ({ handleInputChange, generateUser, formValues }: Props): JSX.Element => {
  return <form onSubmit={generateUser}>
    <div>
      <textarea name="text" onChange={handleInputChange} value={formValues.text}/>
    </div>
    <div>
      <label htmlFor="fileName">Filename: </label>
      <input type="text" name="fileName" onChange={handleInputChange} value={formValues.fileName}/>
    </div>
    <div>
      <label htmlFor="compress">Compress</label>
      <input id="compress" name="compress" onChange={handleInputChange} type="checkbox" checked={formValues.compress} />
      <label htmlFor="encrypt">Encrypt</label>
      <input id="encrypt" name="encrypt" onChange={handleInputChange} type="checkbox" checked={formValues.encrypt} />
    </div>
    <button type="submit">Save</button>
  </form>;
};
