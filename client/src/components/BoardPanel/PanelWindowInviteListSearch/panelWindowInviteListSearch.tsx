import React from 'react';

import classes from './panelWindowInviteListSearch.module.scss';

interface IUser {
  id: string;
  name: string;
  login: string;
  boards: any[];
  tasks: any[];
}

type PanelWindowInviteListSearchProps = {
  usersDataForSearch: IUser[];
  usersDataForSend: IUser[];
  onAddedUserForSend(value: any): void;
  checkUserInList(id: string): boolean;
  refInputSearch: any;
};

const PanelWindowInviteListSearch: React.FC<PanelWindowInviteListSearchProps> = ({
  usersDataForSearch,
  usersDataForSend,
  onAddedUserForSend,
  checkUserInList,
  refInputSearch
}) => {
  const renderListUsersForSearch = usersDataForSearch.map((user: any) => {
    const {id, name, login} = user;
    const isUserInListPanel = checkUserInList(id);
    const isUserInListSend = usersDataForSend.some((elem: IUser) => elem.id === id);

    if (isUserInListSend) return null;

    return (
      <li
        key={id}
        className={`${classes['item']} ${isUserInListPanel ? classes.disabled : ''}`}
        onClick={(e) => {
          if (!isUserInListPanel) {
            e.stopPropagation();
            onAddedUserForSend(user);
          }
          refInputSearch.current.focus();
        }}
      >
        <div className={classes['item__user']}>
          <span className={classes['icon']}>{name.slice(0, 1).toLocaleUpperCase()}</span>
          <div className={classes.info}>
            <span className={classes['info__name']}>{name}</span>
            <span className={classes['info__login']}>{login}</span>
          </div>
        </div>
        <span className={classes['item__status']}>
          {isUserInListPanel ? 'Приглашен' : 'Отсутствует'}
        </span>
      </li>
    );
  });

  return <ul className={classes['users-list-search']}>{renderListUsersForSearch}</ul>;
};

export default PanelWindowInviteListSearch;
