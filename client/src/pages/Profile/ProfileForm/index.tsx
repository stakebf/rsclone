import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import MainApiService from '../../../services/MainApiService';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} обязательно!',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: 'Некорректный ${label}!',
  },
};

let isRedirect = false;

const ProfileForm: React.FC<any> = ({user: currentUser}) => {
  console.log('profileForm');
  const service = new MainApiService();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState({
    name: currentUser.name,
    email: currentUser.email,  
  });
  
  const items = {
    name: 'Имя',
    save: 'Сохранить',
  }

  function  onFinish(values: any) {
    if (values.userName === user.name && values.userEmail === user.email) return;
    console.log('update');
    isRedirect = true;
    service.putUser(currentUser.id, { id: currentUser.id, name: values.userName, login: values.userEmail })
           .then((data) => { 
              console.log('data', data);
              window.location.reload();
              setUser({
                name: values.userName,
                email: values.userEmail,  
              });            
            }).catch((error) => { console.log(error); }).finally();
  }

  console.log('isRedirect', isRedirect);
  if (isRedirect) {
    isRedirect = false;
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <Form initialValues={{ userName: user.name, userEmail: user.email }} validateMessages={validateMessages} onFinish={onFinish}>
        <Form.Item name='userName' label={items.name} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'userEmail'} label="Email" rules={[{ type: 'email', required: true}]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {items.save}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default ProfileForm;
