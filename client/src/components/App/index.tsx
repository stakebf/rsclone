import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from '../../pages/Main';
import Page404 from '../../pages/Page404';
import About from '../../pages/About';
// import classes from './App.module.scss';

const App: React.FC = () => {
  return (
    <Switch>

      <Route 
        path="/" 
        exact
        render={() => <Main />} 
      />

      <Route path="/about" render={() => <About />} />
      <Route render={() => <Page404 />} />
    </Switch>
  );
};

export default App;