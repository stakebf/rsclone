import React from 'react';

import classes from './field.module.scss';

type FieldProps = {
  type: string;
  placeholder: string;
  error: boolean;
  value: string;
  setValue(value: string): void;
  errorMessage: string;
  disabled: boolean;
};

const Field: React.FC<FieldProps> = (props) => {
  const {type, placeholder, error, value, setValue, errorMessage, disabled} = props;
  console.log(classes);

  return (
    <>
      <input
        type={type}
        className={`${classes.field} ${error ? classes.error : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setValue(e.target.value)}
        required
        disabled={disabled}
      />
      <p className={`${classes['error-message']} ${error ? classes.show : ''}`}>{errorMessage}</p>
    </>
  );
};

export default Field;
