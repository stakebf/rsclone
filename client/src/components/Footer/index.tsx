import React from 'react';
import classes from './Footer.module.scss';

const Footer: React.FC = () => {
  const logoGit = '/svg/github.svg';
  const logoRSS = '/svg/rs_school.svg';

  type nameDeveloper = {
    name: string
  }

  const Developer: React.FC<nameDeveloper> = ({name}) => {
    const git='https://github.com/' + name;
    return (
        <div className='developer'>
            <a href={git} target='_blank' rel='noopener noreferrer'>
                <img src={logoGit} alt="Logo git" className={classes.logoGit} />
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
      <a href='https://rs.school/js/' target='_blank' rel='noopener noreferrer'>
          <img className={classes.logoRSS} src={logoRSS} alt='logo RSS' />
      </a>
    </footer>
  );
};

export default Footer;
