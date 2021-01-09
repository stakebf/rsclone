import React, {useEffect} from 'react';

import classes from './signInUp.module.scss';

type SignInUpProps = {
  type: string
}

const SignInUp: React.FC<SignInUpProps> = (type) => {
  useEffect(() => {
    console.log(type);
  }, [type]);

  return (
    <>
      <header className={classes.header}>
        <img
          alt="Trello"
          className={classes.logo}
          src="/svg/trello-logo-blue.svg"
        ></img>
      </header>
      <main className={classes.main}>
        <section className={classes.container}>
        </section>
      </main>
    </>
  );
};

export default SignInUp;