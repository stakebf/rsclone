import React from 'react';
import {CloseOutlined} from '@ant-design/icons';

import classes from './panelWindowInviteListSend.module.scss';

interface IUser {
  id: string;
  name: string;
  login: string;
  boards: any[];
  tasks: any[];
}

type PanelWindowInviteListSendProps = {
  usersDataForSend: IUser[];
  onDeletedUserForSend(id: string): void;
};

const PanelWindowInviteListSend: React.FC<PanelWindowInviteListSendProps> = ({
  usersDataForSend,
  onDeletedUserForSend
}) => {
  const renderListUsersForSend = usersDataForSend.map((elem: any) => {
    const {id, name} = elem;
    return (
      <li key={id} className={classes['item']}>
        <span className={classes['item__name']}>{name}</span>
        <span
          className={classes['item__close']}
          onClick={(e) => {
            e.stopPropagation();
            onDeletedUserForSend(id);
          }}
        >
          <CloseOutlined />
        </span>
      </li>
    );
  });

  return <ul className={classes['users-list-selected']}>{renderListUsersForSend}</ul>;
};

export default PanelWindowInviteListSend;
