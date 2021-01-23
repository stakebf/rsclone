import React from 'react';
import { connect } from 'react-redux';
import { DatePicker, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

import { setDate } from '../../../../../../redux/actions';
import classes from './DateSetter.module.scss';

const DateSetter:React.FC<any> = ({ columnId, taskId, date, setDate }) => {
  const getDate = (date:any, dateString:any) => {
    console.log(date, dateString);
    setDate(columnId, taskId, dateString);
  };

  const dateFormat = 'MM/DD/YYYY';
  
  return (
    <div className={classes.dateWrapper}>
      {console.log(date)}
      <h3 className={classes.title}>
        <CalendarOutlined /> Дата окончания (M/D/Y)
      </h3>
      <Space direction="vertical">
        <DatePicker 
          onChange={getDate} 
          defaultValue={date ? moment(date, dateFormat) : undefined} 
          format={dateFormat}  
          placeholder='Выберите дату'
        />
      </Space>
    </div>
  );
};

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    setDate: (columnId:string, taskId:string, date:string) => dispatch(
      setDate(columnId, taskId, date)
    )
  }
}

export default connect(null, mapDispatchStateToProps)(DateSetter);
