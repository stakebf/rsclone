import React, {useState, useEffect} from 'react';
import Field from '../field';

import classes from './form.module.scss';

interface IDataForUser {
  email: string;
  username: string;
  password: string;
  setDisabledForm(value: boolean): void;
  setErrorEmail(value: boolean): void;
  setErrorUsername(value: boolean): void;
  setErrorPassword(value: boolean): void;
}

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
  sendUserToLogin?(dataForUser: IDataForUser): void;
  sendUserToRegister?(dataForUser: IDataForUser): void;
}

type FormProps = {
  settings: ISettings;
};

const Form: React.FC<FormProps> = ({settings}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);

  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
      setUsername('');
      setErrorEmail(false);
      setErrorUsername(false);
      setErrorPassword(false);
    };
  }, [
    setEmail,
    setPassword,
    setUsername,
    setErrorEmail,
    setErrorUsername,
    setErrorPassword,
    settings
  ]);

  const sendForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const dataForUser = {
      email,
      username,
      password,
      setDisabledForm,
      setErrorEmail,
      setErrorUsername,
      setErrorPassword
    };

    if (settings.sendUserToLogin) {
      settings.sendUserToLogin(dataForUser);
    } else if (settings.sendUserToRegister) {
      settings.sendUserToRegister(dataForUser);
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
