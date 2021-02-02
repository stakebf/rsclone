import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import MainApiService from '../../services/MainApiService';
import Form from './components/form';

import classes from './signInUp.module.scss';

type SignInUpProps = {
  type: string;
};

const SignInUp: React.FC<SignInUpProps> = ({type}) => {
  const service = new MainApiService();

  const [isRedirect, setRedirect] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [errorMessageServer, setErrorMessageServer] = useState('');
  const [errorValidEmail, setErrorValidEmail] = useState(false);
  const [errorValidUsername, setErrorValidUsername] = useState(false);
  const [errorValidPassword, setErrorValidPassword] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);

  useEffect(() => {
    return () => {
      setErrorServer(false);
      setErrorValidEmail(false);
      setErrorValidUsername(false);
      setErrorValidPassword(false);
    };
  }, [setErrorServer, setErrorValidEmail, setErrorValidUsername, setErrorValidPassword, type]);

  const isEmailValid = (email: string): boolean => /.+@.+\..+/i.test(email);
  const isUsernameValid = (username: string): boolean => /.{2,}/i.test(username);
  const isPasswordValid = (password: string): boolean => /.{8,}/i.test(password);

  function showErrors(email: string, username: string, password: string): void {
    setErrorValidEmail(isEmailValid(email) ? false : true);
    setErrorValidUsername(isUsernameValid(username) ? false : true);
    setErrorValidPassword(isPasswordValid(password) ? false : true);
  }

  const settings = ((type) => {
    switch (type) {
      case 'login':
        return {
          head: 'Вход в Trello',
          linkWord: 'Зарегистрировать аккаунт',
          linkTo: 'register',
          isUsername: false,
          btnSend: {
            name: 'Войти',
            bg: 'green'
          },
          errorMessageValid: {
            email: '',
            username: '',
            password: ''
          },
          sendUserToLogin(email: string, password: string): void {
            setDisabledForm(true);
            service
              .postUserToLogin({login: email, password: password})
              .then(({token, userId}) => {
                localStorage.setItem('rsclone_token', token);
                localStorage.setItem('rsclone_userId', userId);
                setRedirect(true);
              })
              .catch((error) => {
                if (error.message === 'Bad login/password combination') {
                  setErrorMessageServer('Неверный адрес электронной почты или пароль');
                } else {
                  setErrorMessageServer('Произошел технический сбой! Попробуйте позже');
                }
                setErrorServer(true);
              })
              .finally(() => setDisabledForm(false));
          }
        };
      case 'register':
        return {
          head: 'Регистрация аккаунта',
          linkWord: 'Уже есть аккаунт? Войти',
          linkTo: 'login',
          isUsername: true,
          btnSend: {
            name: 'Зарегистрироваться',
            bg: 'blue'
          },
          errorMessageValid: {
            email: 'Некорректный адрес электронной почты',
            username: 'Длина имени должна быть не менее 2 символов',
            password: 'Длина пароля должна быть не менее 8 символов'
          },
          sendUserToRegister(email: string, username: string, password: string): void {
            if (isEmailValid(email) && isUsernameValid(username) && isPasswordValid(password)) {
              setDisabledForm(true);
              service
                .postUserToRegister({login: email, name: username, password: password})
                .then(({token, id}) => {
                  localStorage.setItem('rsclone_token', token);
                  localStorage.setItem('rsclone_userId', id);
                  setRedirect(true);
                })
                .catch((error) => {
                  if (error.message === 'User already exist') {
                    setErrorMessageServer('Адрес электронной почты уже зарегистрирован');
                  } else {
                    setErrorMessageServer('Произошел технический сбой! Попробуйте позже');
                  }
                  setErrorServer(true);
                })
                .finally(() => setDisabledForm(false));
            }

            showErrors(email, username, password);
          }
        };
      default:
        throw new Error('type of sign_IN_UP is not valid');
    }
  })(type);

  if (isRedirect) return <Redirect to="/boards" />;

  return (
    <>
      <header className={classes.header}>
        <img alt="Trello" className={classes.logo} src="/svg/trello-logo-blue.svg"></img>
      </header>

      <main className={classes.main}>
        <img
          className={classes.img}
          src="/svg/trello-left.abecab36.svg"
          alt="trello-left.abecab36"
        />
        <section className={classes.container}>
          <p className={`${classes['error-message']} ${errorServer ? classes.show : ''}`}>
            {errorServer ? errorMessageServer : ''}
          </p>
          <h1 className={classes.title}>{settings.head}</h1>
          <Form
            settings={settings}
            errorEmail={errorValidEmail}
            errorUsername={errorValidUsername}
            errorPassword={errorValidPassword}
            disabledForm={disabledForm}
            type={type}
          />
          <hr className={classes.borderHR} />
          <Link className={classes.link} to={`/${settings.linkTo}`}>
            {settings.linkWord}
          </Link>
        </section>
        <img
          className={classes.img}
          src="/svg/trello-right.2222cb95.svg"
          alt="trello-right.2222cb95"
        />
      </main>
    </>
  );
};

export default SignInUp;
