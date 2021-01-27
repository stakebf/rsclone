import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
  UserAddOutlined, 
  PlusOutlined, 
  CloseOutlined, 
  CheckOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { attachUserToTask, removeUserFromTask } from '../../../../../../redux/actions';
import { Store } from '../../../../../../redux/store/store';
import classes from './AdditionalUsers.module.scss';

const AdditionalUsers:React.FC<any> = ({
  columnId, 
  taskId,
  usersList,
  tableUsers,
  attachUserToTask,
  removeUserFromTask
}) => {
  const [isSetUser, setIsSetUser] = useState<boolean>(false);
  const userPickerClasses = [classes.userPickerWrapper, isSetUser && classes.visible];
  
  const userClickHandler = (item:string, user:any) => {
    console.log(item, user);
    !user ? attachUserToTask(columnId, taskId, item) : removeUserFromTask(columnId, taskId, user.id);
  }

  return (
    <div className={classes.usersList}>
      <h3><UserAddOutlined /> Участники</h3>

      <div className={classes.attachedUsers}>
        {!!usersList.length && usersList.map((item:any) => <div 
          className={classes.avatarWrapper}
          key={item.id}
          onClick={() => removeUserFromTask(columnId, taskId, item.id)}
        >
          <div
            className={classes.avatar}
            title={item.name}
          >
            <DeleteOutlined className={classes.removeIcon}/>
            {item.name[0].toUpperCase()}
          </div>
        </div>)}
        <div 
            className={classes.btnAddUser}
            onClick={() => setIsSetUser(true)}  
          >
            <PlusOutlined />
        </div>
      </div>


      {<div className={userPickerClasses.join(' ')}>
        <h4 className={classes.userSubTitle}>Участники</h4>
        <div 
          className={classes.btnCloseUserPicker}
          onClick={() => setIsSetUser(false)}
        >
          <CloseOutlined />
        </div>
        <hr className={classes.lineBreak}/>
        <div className={classes.userAvatarsWrapper}>
          {tableUsers.map((item:any) => {
            console.log('tableUsers.map((item:any)', item);
            const choosenUser = usersList.find((user:any) => item.id === user.id);
            return <div 
              className={classes.avatarWrapper}
              key={item.id}
              onClick={() => userClickHandler(item, choosenUser)}
            >
              <div 
                title={item.name}
                className={classes.avatar}
              >
                {item.name[0].toUpperCase()}
                {!!choosenUser && <CheckOutlined className={classes.iconCheck} />}
              </div>
            </div>
          })}
        </div>
      </div>}

    </div>
  );
};

const mapStateToProps = (state: Store) => {
  return {
    tableUsers: state.board.usersList
  }
}

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    attachUserToTask: (columnId:string, taskId:string, color:string) => dispatch(attachUserToTask(
      columnId, taskId, color
    )), 
    removeUserFromTask: (columnId:string, taskId:string, userId:string) => dispatch(removeUserFromTask(
      columnId, taskId, userId 
    )),
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(AdditionalUsers);
