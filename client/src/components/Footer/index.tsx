import React from 'react';
import { ReactComponent as RSschool } from './rs_school.svg';
import classes from './Footer.module.scss';
import { GithubOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  type nameDeveloper = {
    name: string
  }

  const Developer: React.FC<nameDeveloper> = ({name}) => {
    const git='https://github.com/' + name;
    return (
        <div className='developer'>
            <a className={classes.link} href={git} target='_blank' rel='noopener noreferrer'>
              <GithubOutlined className={classes.logoGit}/>
              {name}
            </a>
        </div>
    );
  }

  return (
    <footer className={classes.footer}>
      <span className={classes.year}>&#169; 2021</span>
      <div className={classes.git}>
        <Developer name='stakebf' />
        <Developer name='mashalarchenko' />
        <Developer name='musakius' />
        <Developer name='rgrishchuk' />
      </div>
      <a className={classes.link} href='https://rs.school/js/' target='_blank' rel='noopener noreferrer'>
        <RSschool className={classes.logoRSS} />
      </a>
    </footer>
  );
};

export default Footer;
