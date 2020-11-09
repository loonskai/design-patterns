import React from 'react';

export type WriteFileOptions = {
  text: string
  fileName: string
  compress?: boolean
  encrypt?: boolean
}

type Props = {
  write(event: React.FormEvent<HTMLFormElement>): void
  handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  formValues: WriteFileOptions
}

export const WriteFileForm = ({ handleInputChange, write, formValues }: Props): JSX.Element => {
  return <form onSubmit={write}>
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
    <button type="submit">Write</button>
  </form>;
};
