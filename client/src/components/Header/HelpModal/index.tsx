import React from 'react';
import { Modal, Divider } from 'antd';
import classes from './HelpModal.scss';

type propsHelp = {
  visible: boolean;
  onClose: () => void;
}
const HelpModal: React.FC<propsHelp> = ({visible, onClose}) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <Modal title="Горячие клавиши" visible={visible} onCancel={onClose}  centered={true} footer={null}>
      <h3><b>Esc</b> - Закрытие меню / Отмена изменений</h3>
      <p>
        Нажатие «esc» закроет диалоговое или всплывающее окно и 
        отменит внесённые изменения и комментарии.
      </p>
      <Divider />
      <h3><b>Enter</b> - Подтверждение действия</h3>
      <p>
        Нажатие «enter» переводит курсор на следующую строку 
        или выполненяет команды и операции, подтверждает действия, 
        служит для выбора пункта меню и т.п. 
      </p>
    </Modal>
  );
};

export default HelpModal;
