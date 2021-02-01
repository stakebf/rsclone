import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import { Avatar, Button, Tooltip } from 'antd';
import { ProjectOutlined, HomeOutlined } from '@ant-design/icons';
import ProfileMenu from './ProfileMenu';
import BoardsList from './BoardsList';
import Complete from './Complete';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/actions';
import { Store } from '../../redux/store/store';

type HeaderProps = {
  type?: string;
};

const Header: React.FC<HeaderProps> = ({type}) => {
  const btnBoards = 'Доски';
  const user = {
    id: '1',
    name: 'Ruslan Hryshchuk',
    nameShort: 'RH',
    email: 'rus_g@tut.by',
  }

  const boards = [{name: 'covid-19', id: '1'}, {name: 'trello clone', id: '2'}, {name: 'test', id: '3'}, 
  {name: 'test1', id: '4'}, {name: 'trello clone', id: '5'}, {name: 'test', id: '6'},
  {name: 'test1', id: '7'}, {name: 'trello clone', id: '8'}, {name: 'test', id: '9'},
  {name: 'test1', id: '10'}, {name: 'trello clone', id: '11'}, {name: 'test', id: '12'},
  {name: 'test1', id: '13'}, {name: 'trello clone', id: '14'}, {name: 'test', id: '15'},
  {name: 'test1', id: '16'}, {name: 'trello clone', id: '17'}, {name: 'test', id: '18'},
  {name: 'test1', id: '19'}, {name: 'trello clone', id: '20'}, {name: 'test', id: '21'},
  ];
  const [visibleProfileMenu, setVisibleProfileMenu] = useState(false);

  function closeProfileMenu() {
    setVisibleProfileMenu(false);
  }

  const [visibleBoardsList, setVisibleBoardsList] = useState(false);

  function closeBoardsList() {
    setVisibleBoardsList(false);
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
                <Complete userId={user.id}/>
              </div>
            )
            : null
          }
        </div>
        <div className={classes.title}>
          <Link className={classes.link} to="/">
            <ProjectOutlined className={classes.logoApp} />
            <span>New Trello</span>
          </Link>
        </div>
        <div className={classes.right}>
          {
              type !== 'main' ? 
              ( 
                <div className={classes.profile} onClick={() => setVisibleProfileMenu(true)}>
                  <Tooltip placement="bottomRight" title={user.name} color={'blue'}>
                    <Avatar style={{ backgroundColor: '#f56a00', color: 'black', fontWeight: 'bold' }}>
                      {user.nameShort}
                    </Avatar>
                  </Tooltip>
                </div>
              )
              : null
            }
        </div>
          { type !== 'main' ? <ProfileMenu visible={visibleProfileMenu} onClose={closeProfileMenu} onClick={closeProfileMenu} user={user}/> : null }        
   </header>
   );
};

const mapStateToProps = (state: Store) => {
  return {
    board: state.board,
    error: state.error
  }
}

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    fetchBoard: (boardId: string) => dispatch(fetchBoard(boardId)),
    addColumn: (boardId:string, title:string) => dispatch(addColumn(boardId, title)),
    setCurrentUser: () => dispatch(setCurrentUser())
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Header);
