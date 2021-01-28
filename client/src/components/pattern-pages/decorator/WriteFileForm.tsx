import React from 'react';

export type WriteFileOptions = {
  text: string
  fileName: string
  compress?: boolean
  encrypt?: boolean
}

type Props = {
  write(event: React.FormEvent<HTMLFormElement>): void;
  handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  formValues: WriteFileOptions;
}

export const WriteFileForm = ({ handleInputChange, write, formValues }: Props): JSX.Element => {
  return <form onSubmit={write}>
    <div>
      <label htmlFor="text">Text: </label><br/>
      <textarea id="text" name="text" onChange={handleInputChange} value={formValues.text}/>
    </div>
    <div>
      <label htmlFor="fileName">Filename: </label><br/>
      <input type="text" name="fileName" onChange={handleInputChange} value={formValues.fileName}/>
    </div>
    <div>
      <input id="compress" name="compress" onChange={handleInputChange} type="checkbox" checked={formValues.compress} />
      <label htmlFor="compress">Compress</label>
      <br/>
      <input id="encrypt" name="encrypt" onChange={handleInputChange} type="checkbox" checked={formValues.encrypt} />
      <label htmlFor="encrypt">Encrypt</label>
    </div>
    <button type="submit">Write</button>
  </form>;
};
