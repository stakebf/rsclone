import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProfileForm from './ProfileForm';
import Actions from './Actions';
import { Avatar, Tabs } from 'antd';
import classes from './Profile.module.scss';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions';
import { Store } from '../../redux/store/store';

const { TabPane } = Tabs;

let isUpdate = true; 

const Profile: React.FC<any> = ({activeTab, setCurrentUser, currentUser = {}}) => {
  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);
  
  const [pane, setPane] = useState(activeTab);
  if (isUpdate && activeTab && activeTab !== pane) {
    setPane(activeTab);
  }
  const tabsTitle = {
    profile: 'Профиль',
    actions: 'Действия',
  }

  function tabClick(key: string) {
    isUpdate = false;
    setPane(key); 
  }

  if (!isUpdate) isUpdate = true;
  if (!currentUser.name) return null;

  return (
    <div>
      <div className={classes.wrapper}>
        <Header />
        <div className={classes.title}>
            <Avatar style={{ backgroundColor: 'rgb(253, 161, 55)', color: 'black', fontWeight: 'bold' }} size='large'>
              {currentUser.name[0].toUpperCase()}
            </Avatar>          
            <span className={classes.name}>{currentUser.name}</span>
            <span className={classes.email}>{currentUser.login}</span>
        </div>
        <div className={classes.Tabs}>
        <Tabs activeKey={pane} onTabClick={tabClick} centered size="large" type="card">
          <TabPane tab={tabsTitle.profile} key="1">
            <div className={classes.tabProfile}>
              <ProfileForm user={{ name: currentUser.name, email: currentUser.login, id: currentUser.id }} />
            </div>
          </TabPane>
          <TabPane tab={tabsTitle.actions} key="2">
            <div className={classes.tabActions}>
              <Actions />           
            </div>
          </TabPane>
        </Tabs>
        </div>
        <Footer />
      </div>
    </div>
  )
};

const mapStateToProps = (state: Store) => {
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    setCurrentUser: () => dispatch(setCurrentUser())
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Profile);
