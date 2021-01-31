import React, {useState} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProfileForm from './ProfileForm';
import Actions from './Actions';
import { Avatar, Tabs } from 'antd';
import classes from './Profile.module.scss';

let user = {
  nameShort: 'RH',
  name: 'Ruslan Hryshchuk',
  email: 'rus_g@tut.by',
}

const { TabPane } = Tabs;
type ProfileProps = {
  activeTab?: string;
};

let isUpdate = true; 

const Profile: React.FC<ProfileProps> = ({activeTab}) => {
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
        <Tabs activeKey={pane} onTabClick={tabClick} centered size="large" type="card">
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
