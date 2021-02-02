import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Main from '../../pages/Main';
import SignInUp from '../../pages/SignInUp';
import Home from '../../pages/Home';
import Page404 from '../../pages/Page404';
import TestPage from '../../pages/TestPage';
import Profile from '../../pages/Profile';
import Columns from '../Columns';
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
          console.log('to profile');
            let tab = "1";
            if (props.location.state === "2") {
              tab = "2";
            }
            console.log('tab', tab)
            return <Profile activeTab={tab} />
          }
        } />
        <Route path="/test" render={() => <TestPage />} />
        <Route path="/boards" render={() => <Home type="boards" />} />
        <Route path="/login" render={() => <SignInUp type="login" />} />
        <Route path="/register" render={() => <SignInUp type="register" />} />

        <Route
          path="/CurrentBoard/:id"
          exact
          render={({match}) => <Columns boardId={match.params.id} />}
        />
        <Route render={() => <Page404 />} />
      </Switch>
    </>
  );
};

export default App;
