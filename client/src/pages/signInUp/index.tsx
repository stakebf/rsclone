import React, {useEffect} from 'react';
import {Link /* , Redirect */} from 'react-router-dom';
import Form from './components/form';

import classes from './signInUp.module.scss';

type SignInUpProps = {
  type: string;
};

const SignInUp: React.FC<SignInUpProps> = ({type}) => {
  useEffect(() => {
    console.log(type);
  }, [type]);

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
          validMethod: {
            isEmailValid: function (email: string): boolean {
              return /.+@.+\..+/i.test(email);
            },
            isUsernameValid: function (username: string): boolean {
              return /.{2,}/i.test(username);
            },
            isPasswordValid: function (password: string): boolean {
              return /.{8,}/i.test(password);
            }
          }
        };
      default:
        throw new Error('type of sign_IN_UP is not valid');
    }
  })(type);

  return (
    <>
      <header className={classes.header}>
        <img alt="Trello" className={classes.logo} src="/svg/trello-logo-blue.svg"></img>
      </header>
      <main className={classes.main}>
        <section className={classes.container}>
          <h1 className={classes.title}>{settings.head}</h1>
          <Form settings={settings} />
          <hr className={classes.borderHR} />
          <Link className={classes.link} to={`/${settings.linkTo}`}>
            {settings.linkWord}
          </Link>
        </section>
      </main>
    </>
  );
};

export default SignInUp;
