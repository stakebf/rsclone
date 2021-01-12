import React from 'react';
import classes from './boards.module.scss';

const Boards: React.FC = () => {
  const boards = [
    {bg: '/images/bg_board_1.jpg'},
    {bg: '/images/bg_board_2.jpg'},
    {bg: '/images/bg_board_3.jpg'},
    {bg: '/images/bg_board_4.jpg'}
  ];

  return (
    <div className={classes.container}>
      <div className={classes['control-panel']}>
        <ul className={classes['list-tabs']}>
          <li className={classes.tab}>
            <img className={classes.icon} src="/svg/trello-brands.svg" alt="trello-brands" />
            <span>Доски</span>
          </li>
          <li className={classes.tab}>
            <img className={classes.icon} src="/svg/pulse.svg" alt="pulse" />
            <span>Главная страница</span>
          </li>
        </ul>
      </div>
      <div className={classes['all-boards']}>
        <div className={classes.block}>
          <h4 className={classes['title']}>Ваши доски</h4>
          <div className={classes['content']}>
            <ul className={classes['list-boards']}>
              <li className={classes.item} style={{backgroundImage: 'url(/images/bg_board_1.jpg)'}}>
                <div className={classes['content-item']}>
                  <h5 className={classes['title-item']}>Head</h5>
                </div>
              </li>
              <li className={classes.item} style={{backgroundImage: 'url(/images/bg_board_2.jpg)'}}>
                <div className={classes['content-item']}>
                  <h5 className={classes['title-item']}>Head</h5>
                </div>
              </li>
              <li className={classes.item} style={{backgroundImage: 'url(/images/bg_board_3.jpg)'}}>
                <div className={classes['content-item']}>
                  <h5 className={classes['title-item']}>Head</h5>
                </div>
              </li>
              <li className={classes.item} style={{backgroundImage: 'url(/images/bg_board_4.jpg)'}}>
                <div className={classes['content-item']}>
                  <h5 className={classes['title-item']}>Head</h5>
                </div>
              </li>
              <li className={classes.item} style={{backgroundImage: 'url(/images/bg_board_5.jpg)'}}>
                <div className={classes['content-item']}>
                  <h5 className={classes['title-item']}>Head</h5>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
