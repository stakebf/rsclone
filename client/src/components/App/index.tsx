import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from '../../pages/Main';
import Page404 from '../../pages/Page404';
// import classes from './App.module.scss';

const App: React.FC = () => {
  return (
    <Switch>

      <Route 
        path="/" 
        exact
        render={() => <Main />} 
      />

      <Route render={() => <Page404 />} />
    </Switch>
  );
};

export default App;