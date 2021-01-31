import React, { useState } from 'react';
import { Modal } from 'antd';
import classes from './HelpModal.module.scss';

type propsHelp = {
  visible: boolean;
  onClose: () => void;
}
const HelpModal: React.FC<propsHelp> = ({visible, onClose}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <Modal title="Горячие клавиши" visible={visible} onCancel={onClose}  centered={true} footer={null}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p> 
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p> 
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p> 
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p> 
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p> 
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p> 
    </Modal>
  );
};

export default HelpModal;
