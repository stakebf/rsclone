import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
  HighlightOutlined, 
  PlusOutlined, 
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import { addTag, removeTag } from '../../../../../../redux/actions';
import classes from './Tags.module.scss';

const COLORS = [
  'red',
  'green',
  'blue',
  'orange',
  'violet'
];

const Tags:React.FC<any> = ({
  columnId, 
  taskId,
  tags,
  addTag,
  removeTag
}) => {
  const [isSetColor, setIsSetColor] = useState<boolean>(false);

  const colorClickHandler = (color:string, element:any) => {
    !element ? addTag(columnId, taskId, color) : removeTag(columnId, taskId, element.id);
  }

  const colorPickerClasses = [classes.colorPickerWrapper, isSetColor && classes.visible];
  return (
    <div>
      <h3><HighlightOutlined /> Метки</h3>
      <div className={classes.tagsWrapper}>
        {console.log(tags.length)}
        {!!tags.length && tags.map((item:any) => <div
          className={`${classes.currentColors} ${classes[item.color]}`}
          onClick={() => removeTag(columnId, taskId, item.id)}
          key={item.id}
        >
          <DeleteOutlined className={classes.removeIcon}/>
        </div>)}

        <div 
          className={classes.btnAddColor}
          onClick={() => setIsSetColor(true)}  
        >
          <PlusOutlined />
        </div>

        {<div className={colorPickerClasses.join(' ')}>
          <h4 className={classes.tagsSubTitle}>Метки</h4>
          <div 
            className={classes.btnCloseColorPicker}
            onClick={() => setIsSetColor(false)}
          >
            <CloseOutlined />
          </div>
          <hr className={classes.lineBreak}/>
          {COLORS.map((item:any) => {
            const choosenTag = tags.find((tag:any) => item === tag.color);
            return <div 
              className={`${classes.colorPicker} ${classes[item]}`}
              key={item}
              onClick={() => colorClickHandler(item, choosenTag)}
            >
              {!!choosenTag && <CheckOutlined className={classes.iconCheck} />}
            </div>;
          })}
        </div>}

      </div>
    </div>
  );
};


const mapDispatchStateToProps = (dispatch: any) => {
  return {
    addTag: (columnId:string, taskId:string, color:string) => dispatch(addTag(
      columnId, taskId, color
    )), 
    removeTag: (columnId:string, taskId:string, tagId:string) => dispatch(removeTag(
      columnId, taskId, tagId 
    )),
  }
}

export default connect(null, mapDispatchStateToProps)(Tags);
