import React from 'react';
import { Alert, Form, Input, Button } from 'antd';
import MainApiService from '../../../services/MainApiService';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../../../redux/actions';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} обязательно!',
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: 'Некорректный ${label}!',
  },
};

let isError = false;

const ProfileForm: React.FC<any> = ({user: currentUser,  updateCurrentUser}) => {
  console.log('beginForm', currentUser);
  const [form] = Form.useForm();
  const service = new MainApiService();

  let user = {
    name: currentUser.name,
   email: currentUser.email,
  }
  
  const items = {
    name: 'Имя',
    save: 'Сохранить',
  }

  function  onFinish(values: any) {
    console.log('before zapros user', user);
    console.log('beforevalues', values);
    if (values.userName === user.name && values.userEmail === user.email) return;
    const newUser: any = { id: currentUser.id };
    if (values.userName !== user.name) newUser.name = values.userName;
    if (values.userEmail !== user.email) newUser.login = values.userEmail;
    console.log('zapros', newUser);
    service.putUser(currentUser.id, newUser)
           .then(() => { 
              isError = false;
              updateCurrentUser(values.userName, values.userEmail);
            }).catch((error) => { 
              isError = true;
              form.setFieldsValue({ userName: user.name });
              form.setFieldsValue({ userEmail: user.email });
              updateCurrentUser(user.name, user.email);
            });
  }

  console.log('before render', user);
  return (
    <div>
      <Form initialValues={{ userName: user.name, userEmail: user.email }} form={form} validateMessages={validateMessages} onFinish={onFinish}>
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
      {
        isError ? 
        <Alert
          message="Ошибка!!!"
          description="Такой email уже есть в базе"
          type="error"
          closable
        /> : null
      }
      
    </div>
  )
};

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    updateCurrentUser: (name: string, login: string) => dispatch(updateCurrentUser(name, login))
  }
}

export default connect(null, mapDispatchStateToProps)(ProfileForm);
