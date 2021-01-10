import React, {useState, useEffect} from 'react';
import MainApiService from '../../../../services/MainApiService';
import Field from '../field';

import classes from './form.module.scss';

interface ISettings {
  head: string;
  linkWord: string;
  linkTo: string;
  isUsername: boolean;
  btn: {
    name: string;
    bg: string;
  };
  errorMessage: {
    email: string;
    username: string;
    password: string;
  };
  validMethod?: {
    isEmailValid(email: string): boolean;
    isUsernameValid(username: string): boolean;
    isPasswordValid(password: string): boolean;
  };
}

type FormProps = {
  settings: ISettings;
};

const Form: React.FC<FormProps> = ({settings}) => {
  const service = new MainApiService();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setUsername('');
    setErrorEmail(false);
    setErrorUsername(false);
    setErrorPassword(false);
  }, [
    setEmail,
    setPassword,
    setUsername,
    setErrorEmail,
    setErrorUsername,
    setErrorPassword,
    settings
  ]);

  const sendUserToRegister = (): void => {
    if (settings.validMethod) {
      const {isEmailValid, isUsernameValid, isPasswordValid} = settings.validMethod;

      if (!isEmailValid(email) || !isUsernameValid(username) || !isPasswordValid(password)) {
      } else {
        setDisabledForm(true);

        service
          .postUserToRegister({login: email, name: username, password: password})
          .then((data) => console.log(data))
          .catch((error) => console.log(error))
          .finally(() => setDisabledForm(false));
      }
      (function showErrors(): void {
        setErrorEmail(isEmailValid(email) ? false : true);
        setErrorUsername(isUsernameValid(username) ? false : true);
        setErrorPassword(isPasswordValid(password) ? false : true);
      })();
    }
  };

  const sendUserToLogin = (): void => {
    setDisabledForm(true);
    service
      .postUserToLogin({login: email, password: password})
      .then((data) => {
        setErrorEmail(false);
        setErrorPassword(false);
        console.log(data);
      })
      .catch(() => {
        setErrorEmail(true);
        setErrorPassword(true);
      })
      .finally(() => setDisabledForm(false));
  };

  const sendForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (settings.isUsername) {
      sendUserToRegister();
    } else {
      sendUserToLogin();
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
        errorMessage={settings.errorMessage.email}
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
            errorMessage={settings.errorMessage.username}
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
        errorMessage={settings.errorMessage.password}
        disabled={disabledForm}
      />
      <button
        type="submit"
        disabled={disabledForm}
        className={`
        ${classes['btn-send']} 
        ${classes[settings.btn.bg]} 
        ${disabledForm ? classes.disabled : ''}
        `}
      >
        {settings.btn.name}
      </button>
    </form>
  );
};

export default Form;
