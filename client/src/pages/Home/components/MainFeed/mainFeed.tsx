import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import classes from './mainFeed.module.scss';

interface IDataComments {
  nameTask: string;
  countComment: number;
  participants: any;
  boardName: string;
  colum: string;
  authorComment: string;
  dateComment: string;
  textComment: string;
}

type MainFeedItemProps = {
  item: IDataComments;
};

const MainFeedItem: React.FC<MainFeedItemProps> = ({item}) => {
  const {
    nameTask,
    countComment,
    participants,
    boardName,
    colum,
    authorComment,
    dateComment,
    textComment
  } = item;
  return (
    <li className={classes['item-task']}>
      <div className={classes['item-task__info']}>
        <Link to="/" className={classes['link']}>
          <h4 className={classes['link__name']}>{nameTask}</h4>
          <div className={classes['link__content']}>
            <div className={classes['comment']}>
              <img className={classes['comment__icon']} src="/svg/comment.svg" alt="comment" />
              <span className={classes['comment__count']}>{countComment}</span>
            </div>
            <img className={classes['img-user']} src={participants.img} alt="user" />
          </div>
        </Link>
        <div className={classes['info-board']}>
          <Link to="/" className={classes['info-board__link']}>
            {boardName}:
          </Link>
          <span className="info-board__colum"> {colum}</span>
        </div>
      </div>
      <div className={classes['item-task__comment']}>
        <div className={classes['user']}>
          <img className={classes['user__img']} src="/images/user.png" alt="user" />
          <div className={classes['user__info']}>
            <h5 className={classes['name']}>{authorComment}</h5>
            <span className={classes['date']}>{dateComment}</span>
          </div>
        </div>
        <div className={classes['text']}>{textComment}</div>
      </div>
    </li>
  );
};

const MainFeed: React.FC = () => {
  const [dataComments, setDataComments] = useState([
    {
      nameTask: 'Header',
      countComment: 1,
      participants: {name: 'Jon', img: '/images/user.png'},
      boardName: 'Covid-19',
      colum: 'start',
      authorComment: 'Din Ivanov',
      dateComment: '5 дней назад',
      textComment: 'Start task Header'
    },
    {
      nameTask: 'Footer',
      countComment: 1,
      participants: {name: 'Kira', img: '/images/user.png'},
      boardName: 'Momentum',
      colum: 'finish',
      authorComment: 'Vera Petrova',
      dateComment: '1 дней назад',
      textComment: 'finish task Footer'
    },
    {
      nameTask: 'Error message',
      countComment: 1,
      participants: {name: 'Jon', img: '/images/user.png'},
      boardName: 'Momentum',
      colum: 'test',
      authorComment: 'Masha Titan',
      dateComment: '1 час назад',
      textComment: 'test task Error message'
    },
    {
      nameTask: 'map',
      countComment: 1,
      participants: {name: 'Jon', img: '/images/user.png'},
      boardName: 'google',
      colum: 'someday',
      authorComment: 'Vasia Putin',
      dateComment: '10 минут назад',
      textComment: 'someday'
    },
    {
      nameTask: 'Menu',
      countComment: 1,
      participants: {name: 'Jon', img: '/images/user.png'},
      boardName: 'Covid-19',
      colum: 'process',
      authorComment: 'Dima Ivanov',
      dateComment: '7 дней назад',
      textComment: 'add links'
    }
  ]);

  const elements = dataComments.map((item, i) => {
    return <MainFeedItem key={i} item={item} />;
  });

  return (
    <div className={classes['main-feed']}>
      <div className={classes['main-feed__head']}>
        <img className={classes['icon']} src="/svg/heart.svg" alt="heart" />
        <h3 className={classes['title']}>Важные события</h3>
      </div>
      <ul className={classes['main-feed__list']}>{elements}</ul>
    </div>
  );
};

export default MainFeed;
