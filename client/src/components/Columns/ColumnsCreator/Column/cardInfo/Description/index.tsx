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

const Description:React.FC<any> = ({ columnId, cardId, cardDescription, cardOrder, addDescription }) => {
  const [description, setDescription] = useState<string>(cardDescription);
  const [prevDescription, setPrevDescription] = useState<string>('');
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false);

  const descriptionChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    const { value } = e.target;
    // console.loglog(value);
    setDescription(value);
  };

  const descriptionFocusHandler = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    const { value } = e.target;
    e.target.value = '';
    e.target.value = value;
  }

  const closeDescriptionKeydownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>):void => {
    if (e.key ===  'Escape') {
      setDescription(prevDescription);
      setIsEditDescription(false);
    }
  };

  const addDescriptionClickHandler = ():void => {
    setPrevDescription(description);
    setIsEditDescription(true);
  };

  const saveDescriptionClickHandler = ():void => {
    setPrevDescription(description);

    if (description.trim() !== prevDescription.trim()) {
      addDescription(columnId, cardId, description);
    }

    setIsEditDescription(false);
    //  TODO: сделать редьюсер с отправкой на бак и сохранением в сторе
  }

  const closeEditDescriptionClickHandler = ():void => {
    setDescription(prevDescription);
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
          style={{
            backgroundColor: 'green', 
            color: '#fff'
          }}
          onClick={addDescriptionClickHandler}
        >
          {!description.trim() && <span><PlusCircleOutlined /> Добавить</span>}
          {description.trim() && <span><EditOutlined /> Изменить</span>}
        </Button>}
      </div>
      {description.trim() && !isEditDescription && <pre className={classes.descriptionText}>
        {description}
      </pre>}
      {isEditDescription && <div>
          <textarea 
            className={classes.descriptionInput}
            onChange={descriptionChangeHandler}
            onKeyDown={closeDescriptionKeydownHandler}
            onFocus={descriptionFocusHandler}
            value={description}
            autoFocus
            placeholder='Введите описание карточки'
          />
          <Button 
            type="default"
            style={{
              backgroundColor: 'green', 
              color: '#fff',
              marginRight: '5px'
            }}
            onClick={saveDescriptionClickHandler}
          >
            <PlusCircleOutlined />
            Сохранить
          </Button>
          <Button 
            danger
            onClick={closeEditDescriptionClickHandler}
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
