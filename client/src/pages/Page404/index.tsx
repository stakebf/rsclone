import React from 'react';
import { Result, Button } from 'antd';
import './404.scss';

const Page404: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, something went wrong."
      extra={<a href="/"><Button type="primary">Back Home</Button></a>}
    />
  )
};

export default Page404;
