import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProfileForm from './ProfileForm';
import Actions from './Actions';
import { Avatar, Drawer, Divider, Tabs } from 'antd';
import classes from './Profile.module.scss';

const user = {
  nameShort: 'RH',
  name: 'Ruslan Hryshchuk',
  email: 'rus_g@tut.by',
}

const { TabPane } = Tabs;

const Profile: React.FC = () => {
  const tabsTitle = {
    profile: 'Профиль',
    actions: 'Действия',
  }
  return (
    <div>
      <div className={classes.wrapper}>
        <Header />
        <div className={classes.title}>
            <Avatar style={{ backgroundColor: '#f56a00', color: 'black', fontWeight: 'bold' }} size='large'>
              {user.nameShort}
            </Avatar>          
            <span className={classes.name}>{user.name}</span>
            <span className={classes.email}>{user.email}</span>
        </div>
        <div className={classes.Tabs}>
        <Tabs defaultActiveKey="1" centered size="large">
          <TabPane tab={tabsTitle.profile} key="1">
            <div className={classes.tabProfile}>
              <ProfileForm />
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

export default Profile;
