import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Main from '../../pages/Main';
import SignInUp from '../../pages/SignInUp';
import Home from '../../pages/Home';
import Page404 from '../../pages/Page404';
import TestPage from '../../pages/TestPage';
import Profile from '../../pages/Profile';
import Columns from '../Columns';
// import classes from './App.module.scss';

const App: React.FC = () => {
  const token = localStorage.getItem('rsclone_token');
  const userId = localStorage.getItem('rsclone_userId');
  const isToken = token && userId;
  console.log(isToken);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          {isToken ? <Home type="main" /> : <Main />}
        </Route>

        <Route path="/profile" exact render={(props) => {
          let tab = "1";
          if (props.location.state === "2") {
            tab = "2";
          }
            return <Profile activeTab={tab} />
          }
        } />
        <Route path="/test" render={() => <TestPage />} />
        <Route path="/boards" render={() => <Home type="boards" />} />
        <Route path="/login" render={() => <SignInUp type="login" />} />
        <Route path="/register" render={() => <SignInUp type="register" />} />
        <Route path="/404" render={() => <Page404 />} />

        <Route
          path="/currentBoard/:id"
          exact
          render={({match}) => <Columns boardId={match.params.id} />}
        />
        <Route render={() => <Page404 />} />
      </Switch>
    </>
  );
};

export default App;
