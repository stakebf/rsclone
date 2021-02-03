import React from 'react';
import { Form, Input, Button } from 'antd';
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
  string: {
    min: "Имя должно быть не меньше ${min} символов",
  },
};

const ProfileForm: React.FC<any> = ({user: currentUser,  updateCurrentUser}) => {
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
    if (values.userName === user.name && values.userEmail === user.email) return;
    const newUser: any = { id: currentUser.id };
    if (values.userName !== user.name) newUser.name = values.userName;
    if (values.userEmail !== user.email) newUser.login = values.userEmail;
    service.putUser(currentUser.id, newUser)
           .then(() => { 
                updateCurrentUser(values.userName, values.userEmail);
            }).catch((error) => { 
              form.setFieldsValue({ userName: user.name });
              form.setFieldsValue({ userEmail: user.email });
              updateCurrentUser(user.name, user.email);
            });
  }

  return (
    <div>
      <Form initialValues={{ userName: user.name, userEmail: user.email }} form={form} validateMessages={validateMessages} onFinish={onFinish}>
        <Form.Item name='userName' label={items.name} rules={[{ required: true, min: 2 }]}>
          <Input autoComplete='off' />
        </Form.Item>
        <Form.Item name={'userEmail'} label="Email" rules={[{ type: 'email', required: true}]}>
          <Input  autoComplete='off' />
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

const mapDispatchStateToProps = (dispatch: any) => {
  return {
    updateCurrentUser: (name: string, login: string) => dispatch(updateCurrentUser(name, login))
  }
}

export default connect(null, mapDispatchStateToProps)(ProfileForm);
