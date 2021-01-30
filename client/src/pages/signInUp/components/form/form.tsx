import React, {useState, useEffect} from 'react';
import Field from '../field';

import classes from './form.module.scss';

interface ISettings {
  head: string;
  linkWord: string;
  linkTo: string;
  isUsername: boolean;
  btnSend: {
    name: string;
    bg: string;
  };
  errorMessageValid: {
    email: string;
    username: string;
    password: string;
  };
  sendUserToLogin?(email: string, password: string): void;
  sendUserToRegister?(email: string, username: string, password: string): void;
}

type FormProps = {
  settings: ISettings;
  errorEmail: boolean;
  errorUsername: boolean;
  errorPassword: boolean;
  disabledForm: boolean;
  type: string;
};

const Form: React.FC<FormProps> = ({
  settings,
  errorEmail,
  errorUsername,
  errorPassword,
  disabledForm,
  type
}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
      setUsername('');
    };
  }, [setEmail, setPassword, setUsername, type]);

  const sendForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (settings.sendUserToLogin) {
      settings.sendUserToLogin(email, password);
    } else if (settings.sendUserToRegister) {
      settings.sendUserToRegister(email, username, password);
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={(e: React.FormEvent<HTMLFormElement>): void => sendForm(e)}
    >
      <Field
        type="email"
        placeholder="Укажите адрес электронной почты"
        error={errorEmail}
        value={email}
        setValue={setEmail}
        errorMessage={settings.errorMessageValid.email}
        disabled={disabledForm}
      />
      {settings.isUsername && (
        <>
          <Field
            type="text"
            placeholder="Введите полное имя"
            error={errorUsername}
            value={username}
            setValue={setUsername}
            errorMessage={settings.errorMessageValid.username}
            disabled={disabledForm}
          />
        </>
      )}
      <Field
        type="password"
        placeholder="Введите пароль"
        error={errorPassword}
        value={password}
        setValue={setPassword}
        errorMessage={settings.errorMessageValid.password}
        disabled={disabledForm}
      />
      <button
        type="submit"
        disabled={disabledForm}
        className={`
        ${classes['btn-send']} 
        ${classes[settings.btnSend.bg]} 
        ${disabledForm ? classes.disabled : ''}
        `}
      >
        {settings.btnSend.name}
      </button>
    </form>
  );
};

export default Form;
