import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from '../../pages/Main';
import SignInUp from '../../pages/SignInUp';
import Home from '../../pages/Home';
import Page404 from '../../pages/Page404';
import BoardPanel from '../BoardPanel/Panel';
import Columns from '../Columns';
// import classes from './App.module.scss';

const App: React.FC = () => {
  return (
    <>
      <BoardPanel />
      <Switch>
        <Route path="/" exact>
          {true /* isToken */ ? <Home type="main" /> : <Main />}
        </Route>

        {/* <Route
        path="/:userId/boards"
        render={({match}) => <Home userId={match.params.userId} type="boards" />}
      /> */}
        <Route path="/boards" render={() => <Home type="boards" />} />
        <Route path="/login" render={() => <SignInUp type="login" />} />
        <Route path="/register" render={() => <SignInUp type="register" />} />

        <Route 
          path="/CurrentBoard/:id" 
          exact
          render={({match}) => <Columns boardId={match.params.id}/>}
        />
        <Route render={() => <Page404 />} />
      </Switch>
    </>
  );
};

export default App;
