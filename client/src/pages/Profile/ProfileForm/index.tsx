import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} обязательно!',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: 'Некорректный ${label}!',
  },
};

let isRedirect = false;

const ProfileForm: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState({
    nameShort: 'RH',
    name: 'Ruslan Hryshchuk',
    email: 'rus_g@tut.by',  
  });
  
  const items = {
    name: 'Имя',
    save: 'Сохранить',
  }

  function  onFinish(values: any) {
    if (values.userName === user.name && values.userEmail === user.email) return;
    isRedirect = true;
    setUser({
      nameShort: 'RH',
      name: 'Ruslan Hryshchuk',
      email: 'rus_g@tut.by',  
    });
  }

  if (isRedirect) {
    isRedirect = false;
    <Redirect to="/profile" />
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
