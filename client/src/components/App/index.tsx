import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from '../../pages/Main';
import SignInUp from '../../pages/SignInUp';
import Home from '../../pages/Home';
import Page404 from '../../pages/Page404';
import BoardPanel from '../BoardPanel';
import TestPage from '../../pages/TestPage';
import Profile from '../../pages/Profile';
// import classes from './App.module.scss';

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          {false /* isToken */ ? <Home type="main" /> : <Main />}
        </Route>

        {/* <Route
        path="/:userId/boards"
        render={({match}) => <Home userId={match.params.userId} type="boards" />}
      /> */}
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

        <Route render={() => <Page404 />} />
      </Switch>
    </>
  );
};

export default App;
