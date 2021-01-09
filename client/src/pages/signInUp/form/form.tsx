import React, {useState, useEffect} from 'react';

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
    }
}

type FormProps = {
    settings: ISettings
    
}

const Form: React.FC<FormProps> = ({settings}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setUsername('');
  }, [setEmail, setPassword, setUsername, settings]);

  const isEmailValid = (): boolean => {
    return /.+@.+\..+/i.test(email);
  };
  const isUsernameValid = (): boolean => {
    return username.length > 2;
  };
  const isPasswordValid = (): boolean => {
    return password.length > 8;
  };

  const showErrors = (): void => {
    setErrorEmail(isEmailValid() ? false : true);
    setErrorUsername(isUsernameValid() ? false : true);
    setErrorPassword(isPasswordValid() ? false : true);
  };

  const sendForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!isEmailValid() || !isUsernameValid() || !isPasswordValid()) {
      showErrors();
    } else {
      showErrors();
    }
  };

  return (
    <form className={classes.form} onSubmit={(e: React.FormEvent<HTMLFormElement>): void => sendForm(e)}>
      <input
        type="email"
        className={errorEmail ? `${classes.field} ${classes.error}` : classes.field}
        placeholder="Укажите адрес электронной почты"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
        required
      />
      <p className={errorEmail ? `${classes['error-message']} ${classes.show}` : classes['error-message']}>
        {settings.errorMessage.email}
      </p>
      {settings.isUsername && (
        <>
          <input
            type="text"
            className={errorUsername ? `${classes.field} ${classes.error}` : classes.field}
            placeholder="Введите полное имя"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setUsername(e.target.value)}
            required
          />
          <p className={errorUsername ? `${classes['error-message']} ${classes.show}` : classes['error-message']}>
            {settings.errorMessage.username}
          </p>
        </>
      )}
      <input
        type="password"
        className={errorPassword ? `${classes.field} ${classes.error}` : classes.field}
        placeholder="Введите пароль"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}
        required
      />
      <p className={errorPassword ? `${classes['error-message']} ${classes.show}` : classes['error-message']}>
        {settings.errorMessage.password}
      </p>
      <button type="submit" className={`${classes['btn-send']} ${classes[settings.btn.bg]}`}>
        {settings.btn.name}
      </button>
    </form>
  );
};

export default Form;
