import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import PanelWindowInviteListSearch from '../PanelWindowInviteListSearch';
import PanelWindowInviteListSend from '../PanelWindowInviteListSend';
import MainApiService from '../../../services/MainApiService';
import {CloseOutlined, LoadingOutlined} from '@ant-design/icons';

import classes from './panelWindowInvite.module.scss';

interface IUser {
  id: string;
  name: string;
  login: string;
  boards: any[];
  tasks: any[];
}

type PanelWindowInviteProps = {
  boardId: string;
  isOpenWindowInvite: boolean;
  setOpenWindowInvite(flag: boolean): void;
  onToggleUserWindow(id: string | undefined, flag: boolean): void;
  onAddUserToPanelList(value: any): void;
  checkUserInList(id: string): boolean;
};

const PanelWindowInvite: React.FC<PanelWindowInviteProps> = ({
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
  const refInputSearch: any = useRef(null);
  const refListSearch: any = useRef(null);

  const api = useMemo(() => new MainApiService(), []);

  const getDataBoardAll = useCallback(() => {
    api.getUsersAll().then((data) => {
      setUsersInitialData(data);
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
      .then((data) => {
        onAddUserToPanelList(data);
        console.log(data);
      })
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
    }
  };

  const closeListSearch = (e: any): void => {
    const target = e.target;
    const listSearch = refListSearch.current;
    if (usersDataForSearch.length && window) {
      const its_window: boolean = target === listSearch || target.contains(listSearch);
      if (its_window) {
        setUsersDataForSearch([]);
      }
    }
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

  const renderListUsersForSearch = usersDataForSearch.length ? (
    <div className={classes['wrapper-users-list-search']} ref={refListSearch}>
      <PanelWindowInviteListSearch
        usersDataForSearch={usersDataForSearch}
        usersDataForSend={usersDataForSend}
        onAddedUserForSend={onAddedUserForSend}
        checkUserInList={checkUserInList}
        refInputSearch={refInputSearch}
      />
    </div>
  ) : null;

  const renderListUsersForSend = usersDataForSend.length ? (
    <div className={classes['wrapper-users-list-selected']}>
      <PanelWindowInviteListSend
        usersDataForSend={usersDataForSend}
        onDeletedUserForSend={onDeletedUserForSend}
      />
    </div>
  ) : null;

  return (
    <div
      className={classes['window']}
      onClick={(e: React.MouseEvent) => closeListSearch(e)}
      ref={refWindow}
    >
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
          ref={refInputSearch}
        />
        {renderListUsersForSearch}
        {renderListUsersForSend}
      </div>
      <button
        type="button"
        className={`${classes['btn']} ${disabledBtn ? classes.disabled : ''}`}
        onClick={() => sendUsersData()}
        disabled={disabledBtn}
      >
        {loading ? <LoadingOutlined /> : 'Пригласить'}
      </button>
    </div>
  );
};

export default PanelWindowInvite;
