import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import {CloseOutlined, LoadingOutlined} from '@ant-design/icons';

import MainApiService from '../../services/MainApiService';

import classes from './boardPanelBtnInvite.module.scss';

interface IUser {
  id: string;
  name: string;
  login: string;
  boards: any[];
  tasks: any[];
}

type BoardPanelBtnInviteProps = {
  boardId: string;
  isOpenWindowInvite: boolean;
  setOpenWindowInvite(flag: boolean): void;
  onToggleUserWindow(id: string | undefined, flag: boolean): void;
  onAddUserToPanelList(value: any): void;
  checkUserInList(id: string): boolean;
};

const BoardPanelBtnInvite: React.FC<BoardPanelBtnInviteProps> = ({
  boardId,
  isOpenWindowInvite,
  setOpenWindowInvite,
  onToggleUserWindow,
  onAddUserToPanelList,
  checkUserInList
}) => {
  const [value, setValue] = useState('');
  const [usersInitialData, setUsersInitialData] = useState([]);
  const [usersDataForSearch, setUsersDataForSearch] = useState([]);
  const [usersDataForSend, setUsersDataForSend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const refWindow: any = useRef(null);
  const refBtnClose: any = useRef(null);
  const refInput: any = useRef(null);

  const api = useMemo(() => new MainApiService(), []);

  const getDataBoardAll = useCallback(() => {
    api.getUsersAll().then((data) => {
      setUsersInitialData(data);
      console.log(data);
    });
  }, [api]);

  useEffect(() => {
    getDataBoardAll();
  }, [getDataBoardAll]);

  useEffect(() => {
    setValue('');
    setUsersDataForSend([]);
  }, [isOpenWindowInvite]);

  const sendUsersData = () => {
    setLoading(true);
    Promise.all(usersDataForSend.map((elem: IUser) => api.postAddUsersToBoard(elem.id, {boardId})))
      .then((data) => onAddUserToPanelList(data))
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
        setOpenWindowInvite(false);
      });
  };

  const onAddedUserForSend = (user: any) => {
    const newUsersDataForSend: any = [...usersDataForSend, user];
    setUsersDataForSend(newUsersDataForSend);
    setUsersDataForSearch([]);
    setValue('');
    setDisabledBtn(newUsersDataForSend.length ? false : true);
  };

  const onDeletedUserForSend = (id: string) => {
    const newUsersDataForSend: any = usersDataForSend.filter((user: IUser) => {
      return user.id !== id;
    });
    setUsersDataForSend(newUsersDataForSend);
    setDisabledBtn(newUsersDataForSend.length ? false : true);
  };

  const searchUser = (event: any, data: any): void => {
    setValue(event.target.value);
    if (event.target.value.length === 0) {
      setUsersDataForSearch([]);
    } else {
      const newUsersList = data.filter((user: any) => {
        return (
          user.login.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
          user.name.toLowerCase().startsWith(event.target.value.toLowerCase())
        );
      });
      setUsersDataForSearch(newUsersList);
      console.log(newUsersList);
    }
  };

  const renderListUsersForSearch = () => {
    const usersListHTML = usersDataForSearch.map((user: any) => {
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
            refInput.current.focus();
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
    return (
      <div className={classes['autocomplete-search-scroll']}>
        <ul className={classes['users-list-search']}>{usersListHTML}</ul>
      </div>
    );
  };

  const renderListUsersForSend = () => {
    const usersListHTML = usersDataForSend.map((elem: any) => {
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
    return <ul className={classes['users-list-selected']}>{usersListHTML}</ul>;
  };

  const renderWindow = () => {
    return (
      <div className={classes['window']} ref={refWindow}>
        <div className={classes['window__content']}>
          <div className={classes['head']}>
            <span className={classes['head__title']}>Пригласить на доску</span>
            <span className={classes['head__close']} ref={refBtnClose}>
              <CloseOutlined />
            </span>
          </div>
          <span className={classes['divider']}></span>
          <input
            className={classes['input']}
            type="text"
            placeholder="Адрес электронной почты или имя"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              searchUser(e, usersInitialData);
            }}
            ref={refInput}
          />
          {usersDataForSearch.length ? renderListUsersForSearch() : null}
          {usersDataForSend.length ? renderListUsersForSend() : null}
        </div>
        <button
          type="button"
          className={`${classes['window__btn']} ${disabledBtn ? classes.disabled : ''}`}
          onClick={() => sendUsersData()}
          disabled={disabledBtn}
        >
          {loading ? <LoadingOutlined /> : 'Отправить приглашение'}
        </button>
      </div>
    );
  };

  (function closeWindow() {
    document.addEventListener('click', (e: any) => {
      const target = e.target;
      const window = refWindow.current;
      const btnClose = refBtnClose.current;
      if (isOpenWindowInvite && window) {
        const its_window: boolean = target === window || window.contains(target);
        const its_close: boolean = target === btnClose || btnClose.contains(target);
        if ((!its_window && !its_close) || its_close) {
          setOpenWindowInvite(false);
          onToggleUserWindow(undefined, false);
        }
      }
    });
  })();

  return (
    <div className={classes['wrapper-btn']}>
      <button
        type="button"
        className={classes['btn-invite']}
        onClick={(e) => {
          e.stopPropagation();
          setOpenWindowInvite(!isOpenWindowInvite);
          onToggleUserWindow(undefined, false);
        }}
      >
        Пригласить
      </button>
      {isOpenWindowInvite ? renderWindow() : null}
    </div>
  );
};

export default BoardPanelBtnInvite;
