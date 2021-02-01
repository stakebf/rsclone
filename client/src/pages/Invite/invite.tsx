import React, {useRef} from 'react';
import {LinkOutlined} from '@ant-design/icons';

import classes from './invite.module.scss';

type InviteProps = {
  boardId: string;
};

const Invite: React.FC<InviteProps> = ({boardId}) => {
  const refInputLink: any = useRef(null);

  const copyText = (): void => {
    refInputLink.current.select();
    document.execCommand('copy');
  };

  return (
    <div className={classes['block-link']}>
      <span className={classes['block-link__title']}>
        <LinkOutlined className={classes.icon} /> Пригласить с помощью ссылки
      </span>
      <span className={classes['block-link__info']}>
        Любой, у кого есть ссылка, может присоединиться как участник доски
      </span>
      <div className={classes['block-link__field']}>
        <input
          className={classes['input']}
          type="text"
          value={boardId}//TODO link to current board
          readOnly={true}
          ref={refInputLink}
        />
        <button className={`${classes['btn']} ${classes['btn-copy']}`} onClick={() => copyText()}>
          Копировать
        </button>
      </div>
    </div>
  );
};

export default Invite;
