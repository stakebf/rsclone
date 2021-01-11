import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from '../../pages/Main';
import SignInUp from '../../pages/signInUp/signInUp';
import Page404 from '../../pages/Page404';
// import classes from './App.module.scss';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Main />} />

      <Route path="/login" render={() => <SignInUp type="login" />} />
      <Route path="/register" render={() => <SignInUp type="register" />} />

      <Route render={() => <Page404 />} />
    </Switch>
  );
};

export default App;
