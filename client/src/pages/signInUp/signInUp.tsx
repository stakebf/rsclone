import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import MainApiService from '../../services/MainApiService';
import Form from './components/form/form';

import classes from './signInUp.module.scss';

interface IDataForUser {
  email: string;
  username: string;
  password: string;
  setDisabledForm: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorUsername: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

type SignInUpProps = {
  type: string;
};

const SignInUp: React.FC<SignInUpProps> = ({type}) => {
  const service = new MainApiService();

  const [isRedirect, setRedirect] = useState(false);

  const settings = ((type) => {
    switch (type) {
      case 'login':
        return {
          head: 'Вход в Trello',
          linkWord: 'Зарегистрировать аккаунт',
          linkTo: 'register',
          isUsername: false,
          btn: {
            name: 'Войти',
            bg: 'green'
          },
          errorMessage: {
            email: '',
            username: '',
            password: 'Неверный адрес электронной почты или пароль'
          },
          sendUserToLogin(dataForUser: IDataForUser): void {
            const {email, password, setDisabledForm, setErrorEmail, setErrorPassword} = dataForUser;

            setDisabledForm(true);
            service
              .postUserToLogin({login: email, password: password})
              .then(({token}) => {
                localStorage.setItem('token', token);
                setRedirect(true);
              })
              .catch(() => {
                setErrorEmail(true);
                setErrorPassword(true);
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
          btn: {
            name: 'Зарегистрироваться',
            bg: 'blue'
          },
          errorMessage: {
            email: 'Недопустимый адрес электронной почты',
            username: 'Длина имени должна быть не менее 2 символов',
            password: 'Длина пароля должна быть не менее 8 символов'
          },
          validMethods: {
            isEmailValid: (email: string): boolean => /.+@.+\..+/i.test(email),
            isUsernameValid: (username: string): boolean => /.{2,}/i.test(username),
            isPasswordValid: (password: string): boolean => /.{8,}/i.test(password)
          },
          sendUserToRegister(dataForUser: IDataForUser): void {
            const {isEmailValid, isUsernameValid, isPasswordValid} = this.validMethods;
            const {email, username, password, setDisabledForm} = dataForUser;

            if (isEmailValid(email) && isUsernameValid(username) && isPasswordValid(password)) {
              setDisabledForm(true);

              service
                .postUserToRegister({login: email, name: username, password: password})
                .then(({token}) => {
                  localStorage.setItem('token', token);
                  setRedirect(true);
                })
                .catch((error) => console.error(error))
                .finally(() => setDisabledForm(false));
            }

            (function showErrors(): void {
              const {setErrorEmail, setErrorUsername, setErrorPassword} = dataForUser;

              setErrorEmail(isEmailValid(email) ? false : true);
              setErrorUsername(isUsernameValid(username) ? false : true);
              setErrorPassword(isPasswordValid(password) ? false : true);
            })();
          }
        };
      default:
        throw new Error('type of sign_IN_UP is not valid');
    }
  })(type);

  if (isRedirect) return <Redirect to="/" />;

  return (
    <>
      <header className={classes.header}>
        <img alt="Trello" className={classes.logo} src="/svg/trello-logo-blue.svg"></img>
      </header>
      <main className={classes.main}>
        <img className={classes.img} src="/svg/trello-left.abecab36.svg" alt="trello-left.abecab36" />
        <section className={classes.container}>
          <h1 className={classes.title}>{settings.head}</h1>
          <Form settings={settings} />
          <hr className={classes.borderHR} />
          <Link className={classes.link} to={`/${settings.linkTo}`}>
            {settings.linkWord}
          </Link>
        </section>
        <img className={classes.img} src="/svg/trello-right.2222cb95.svg" alt="trello-right.2222cb95" />
      </main>
    </>
  );
};

export default SignInUp;
