import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { 
  CloseCircleOutlined, 
  PlusCircleOutlined, 
  EditOutlined,
  AlignLeftOutlined
} from '@ant-design/icons';

import classes from './Description.module.scss';
import { addDescription } from '../../../../../../redux/actions';

const Description:React.FC<any> = ({ columnId, taskId, description, order, addDescription }) => {
  const [taskDescription, setTaskDescription] = useState<string>(description);
  const [prevDescription, setPrevDescription] = useState<string>('');
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false);

  const descriptionChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    setTaskDescription(e.target.value);
  };

  const descriptionFocusHandler = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    const { value } = e.target;
    e.target.value = '';
    e.target.value = value;
  }

  const closeDescriptionKeydownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>):void => {
    if (e.key ===  'Escape') {
      setTaskDescription(prevDescription);
      setIsEditDescription(false);
    }
  };

  const addDescriptionClickHandler = ():void => {
    setPrevDescription(taskDescription);
    setIsEditDescription(true);
  };

  const saveDescriptionClickHandler = ():void => {
    setPrevDescription(taskDescription);

    if (taskDescription.trim() !== prevDescription.trim()) {
      addDescription(columnId, taskId, taskDescription);
    }

    setIsEditDescription(false);
  }

  const closeEditDescriptionClickHandler = ():void => {
    setTaskDescription(prevDescription);
    setIsEditDescription(false);
  }

  return (
    <div className={classes.description}>
      <div className={classes.descriptionWrapper}>
        <h3 className={classes.descriptionTitle}>
        <AlignLeftOutlined /> Описание
        </h3>
        {!isEditDescription && <Button 
          type="default"
          className={classes.btnChangeDescription}
          onClick={addDescriptionClickHandler}
        >
          {!taskDescription.trim() && <span><PlusCircleOutlined /> Добавить</span>}
          {taskDescription.trim() && <span><EditOutlined /> Изменить</span>}
        </Button>}
      </div>
      {taskDescription.trim() && !isEditDescription && <pre className={classes.descriptionText}>
        {taskDescription}
      </pre>}
      {isEditDescription && <div>
          <textarea 
            className={classes.descriptionInput}
            onChange={descriptionChangeHandler}
            onKeyDown={closeDescriptionKeydownHandler}
            onFocus={descriptionFocusHandler}
            value={taskDescription}
            autoFocus
            placeholder='Введите описание карточки'
          />
          <Button 
            type="default"
            onClick={saveDescriptionClickHandler}
            className={classes.btnChangeDescription}
          >
            <PlusCircleOutlined />
            Сохранить
          </Button>
          <Button 
            danger
            onClick={closeEditDescriptionClickHandler}
            className={classes.btnCloseDescription}
          >
            <CloseCircleOutlined />
          </Button>
        </div>
      }
    </div>
  );
};

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    addDescription: (columnId:string, cardId:string, cardDescription:string) => dispatch(addDescription(
      columnId, cardId, cardDescription
    ))
  }
}

export default connect(null, mapDispatchStateToProps)(Description);
