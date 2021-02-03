import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import { Avatar, Button, Tooltip } from 'antd';
import { ProjectOutlined, HomeOutlined } from '@ant-design/icons';
import ProfileMenu from './ProfileMenu';
import BoardsList from './BoardsList';
// import Complete from './Complete';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions';
import { Store } from '../../redux/store/store';


const Header: React.FC<any> = ({type, setCurrentUser, currentUser = {}}) => {
  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  const btnBoards = 'Доски';
 
  const [visibleProfileMenu, setVisibleProfileMenu] = useState(false);

  function closeProfileMenu() {
    setVisibleProfileMenu(false);
  }

  const [visibleBoardsList, setVisibleBoardsList] = useState(false);

  function closeBoardsList() {
    setVisibleBoardsList(false);
  }
  
  let boards = [];
  if (type !== 'main') {
    if (!currentUser.name) return null;
    boards = currentUser.boards.map((item: string, index: number) => { return {name: index.toString(), id: item} })
  }
  
  return (
    <header className={classes.header}>
        <div className={classes.left}>
          {
            type !== 'main' ? 
            ( 
              <div className={classes.left_wrapper}>
                <Link to="/">
                  <Button className={classes.btn_home} type="primary">
                    <HomeOutlined className={classes.home} />
                  </Button>
                </Link>
                <Button className={classes.btn_boards} type="primary" onClick={()=>setVisibleBoardsList(true)}>
                  <ProjectOutlined className={classes.boards} />
                  <span>{btnBoards}</span>
                </Button>
                <BoardsList boards={boards} visible={visibleBoardsList} onClose={closeBoardsList}/>
                {/* <Complete userId={currentUser.id}/> */}
              </div>
            )
            : null
          }
        </div>
        <div className={classes.title}>
          <Link className={classes.link} to="/">
            <ProjectOutlined className={classes.logoApp} />
            <span className={classes.text}>New Trello</span>
          </Link>
        </div>
        <div className={classes.right}>
          {
              type !== 'main' ? 
              ( 
                <div className={classes.profile} onClick={() => setVisibleProfileMenu(true)}>
                  <Tooltip placement="bottomRight" title={currentUser.name} color={'blue'}>
                    <Avatar style={{ backgroundColor: 'rgb(253, 161, 55)', color: 'black', fontWeight: 'bold' }}>
                      {currentUser.name[0].toUpperCase()}
                    </Avatar>
                  </Tooltip>
                </div>
              )
              : null
            }
        </div>
          { type !== 'main' ? <ProfileMenu visible={visibleProfileMenu} onClose={closeProfileMenu} onClick={closeProfileMenu} user={{name: currentUser.name, email: currentUser.login}}/> : null }        
   </header>
   );
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

export default connect(mapStateToProps, mapDispatchStateToProps)(Header);
