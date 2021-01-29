import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CommentOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

import { addComment, removeComment, editComment } from '../../../../../../redux/actions';
import { Store } from '../../../../../../redux/store/store';
import classes from './Comments.module.scss';

const Comments:React.FC<any> = ({ 
    columnId, 
    taskId, 
    comments, 
    currentUser: { name, id },
    addComment,
    removeComment,
    editComment
  }) => {
  console.log(comments);

  const [message, setMessage] = useState<string>('');
  // const [prevMessage, setPrevMessage] = useState<string>('');
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [isFocus, setIsFocued] = useState<boolean>(false);
  const [editableCommentId, setEditableCommentId] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');

  const classNames = [classes.inputWrapper, isFocus || message ? classes.focused : ''];

  const onFocusHandler = ():void => {
    setIsFocued(true);
  }

  const onOutOfFocusHandler = ():void => {
    setIsFocued(false);
  }

  const commentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setMessage(e.target.value);
  };

  const addCommentClickHandler = ():void => {
    if (message.trim()) {
      addComment(columnId, taskId, message, name, id, new Date().toLocaleString('en-US', { hour12: false }));
      setMessage('');
    }

    //  TODO: сделать редьюсер с отправкой на бак и сохранением в сторе
  }

  const addCommentKeypressHandler = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      if (!message.trim()) {
        return;
      }

      addComment(columnId, taskId, message, name, id, new Date().toLocaleString('en-US', { hour12: false }));
      setMessage('');
    }
  };

  const commentEditChangeHandler:any = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setNewComment(e.target.value);
  };

  const closeCommentEditKeydownHandler:any = (e: React.KeyboardEvent<HTMLInputElement>):void => {
    if (e.key ===  'Escape') {
      setEditableCommentId('');
      setIsEditComment(false);
    }
  };

  const changeCommentKeypressHandler:any = (
    e: React.KeyboardEvent<HTMLInputElement>, 
    elementId?:string
  ):void => {
  if (e.key === 'Enter') {
    if (!newComment.trim()) {
      return;
    }
    
    editComment(columnId, taskId, elementId, newComment, `${new Date().toLocaleString('en-US', { hour12: false })} изменено`);
    setIsEditComment(false);
    setEditableCommentId('');
  }
};

const getChangedFormat = (changedDate:string) => {
  return <>
    {changedDate.replace('изменено', '')} <i>изменено</i>
  </>
}

  return (
    <div className={classes.wrapper}>
      <h3><CommentOutlined /> Действия</h3>
      <div className={classes.inputBlock}>
        <div className={classes.avatarWrapper}>
          <div
            title={name}
            className={classes.avatar}
          >{name[0].toUpperCase()}</div>
        </div>
        <div className={classNames.join(' ')}>
          <input 
            className={classes.commentInput}
            onChange={commentChangeHandler}
            onKeyPress={addCommentKeypressHandler}
            placeholder='Введите комментарий'
            onFocus={onFocusHandler}
            onBlur={onOutOfFocusHandler}
            value={message}
          />
          <Button 
            type="default"
            onClick={addCommentClickHandler}
            className={classes.btnAddComment}
          >
            <PlusCircleOutlined />
            Добавить
          </Button>
        </div>
      </div>
      <div>
        {!!comments.length && comments.map((item:any) => <div key={item.id} className={classes.usersCommentsWrapper}>
          <div className={classes.avatarWrapper}>
            <div 
              title={item.userName}
              className={classes.avatar}
            >
              {item.userName[0].toUpperCase()}
            </div>
          </div>
          {isEditComment && (editableCommentId === item.id) && <input 
            className={classes.commentItemEditInput}
            onChange={commentEditChangeHandler}
            onKeyDown={closeCommentEditKeydownHandler}
            onKeyPress={(e) => changeCommentKeypressHandler(e, item.id)}
            value={newComment}
            autoFocus
            placeholder='Введите комментарий'
          />}
          {(editableCommentId !== item.id) && <div>
            <div>
              <span className={classes.userName}><b>{item.userName}</b></span>
              <span>
                {item.date.indexOf('изменено') >= 0 ? getChangedFormat(item.date) : item.date}
              </span>
            </div>
            <span>{item.message}</span>
            {(id === item.userId) && <div>
              <span 
                className={classes.btnEditComment}
                onClick={() => {
                  setEditableCommentId(item.id);
                  setNewComment(item.message);
                  setIsEditComment(true);
                }}
              >
                Изменить
              </span>
              <Popconfirm
                title="Вы действительно хотите удалить эту карточку"
                onConfirm={() => removeComment(columnId, taskId, item.id)}
                okText="Да"
                cancelText="Нет"
              >
                <span className={classes.btnRemoveComment}>
                  Удалить
                </span>
              </Popconfirm>
              
            </div>}
          </div>}
        </div>).reverse()}

      </div>
    </div>
  );
};

const mapStateToProps = (state: Store) => {
  return {
    currentUser: state.board.currentUser
  }
}

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    addComment: (columnId:string, taskId:string, message:string, name:string, id:string, date:string) => dispatch(addComment(
      columnId, taskId, message, name, id, date
    )), 
    removeComment: (columnId:string, taskId:string, commentId:string) => dispatch(removeComment(
      columnId, taskId, commentId 
    )),
    editComment: (columnId:string, taskId:string, commentId:string, message:string, date:string) => dispatch(editComment(
      columnId, taskId, commentId, message, date
    )),
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Comments);
