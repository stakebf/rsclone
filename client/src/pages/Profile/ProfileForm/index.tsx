import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import classes from './ProfileForm.module.scss';

const user = {
  nameShort: 'RH',
  name: 'Ruslan Hryshchuk',
  email: 'rus_g@tut.by',
}

const validateMessages = {
  required: '${label} обязательно!',
  types: {
    email: 'Некорректный ${label}!',
  },
};

const ProfileForm: React.FC = () => {
  const items = {
    name: 'Имя',
    save: 'Сохранить',
  }
  return (
    <div>
      <Form validateMessages={validateMessages}>
        <Form.Item name={['user', 'name']} label={items.name} rules={[{ required: true }]}>
          <Input defaultValue={user.name}/>
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true}]}>
          <Input  defaultValue={user.email}/>
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
