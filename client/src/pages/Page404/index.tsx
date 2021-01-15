import React from 'react';
import { Result, Button } from 'antd';

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
