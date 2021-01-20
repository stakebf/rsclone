import React from 'react';
import 'antd/dist/antd.css';
import './Carousel.scss';
import classes from './Main.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button, Carousel } from 'antd';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <Header type="main"/>
      <div className={classes.main}>
        <Carousel className={classes.carousel} autoplay autoplaySpeed={5000}>
          <div>
            <div className={classes.content}>
              <div className={classes.text}>
                <h2 className={classes.title}>Trello Clone</h2>
                <p className={classes.p}>A project management board with draggable lists and cards.</p> 
                <p  className={classes.p}>Built with MERN (MongoDB, Express, React.js and Node.js).</p>
                <h2 className={classes.title}>Technical stack</h2>
                <ul className={classes.list}>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>MongoDB</li>
                    <li>React.js</li>
                    <li>Redux</li>
                    <li>React Beautiful DnD</li>
                    <li>TypeScript</li>
                    <li>Scss</li>
                </ul>
              </div>
              <img
                className={classes.img}
                src="/image/about_slide1.svg"
                alt="slide1"
              />
            </div>
          </div>
          <div>
            <div className={classes.content}>
              <div className={classes.text}>
                <h2 className={classes.title}>Helps teams work more collaboratively and get more done.</h2>
                <p className={classes.p}>Boards, lists, and cards enable teams to organize and prioritize 
                projects in a fun, flexible, and rewarding way.</p> 
              </div>            
              <img
                className={classes.img}
                src="/image/about_slide2.png"
                alt="slide2"
              />
            </div>
          </div>
          <div>
            <div className={classes.content}>
              <div className={classes.text}>
                <h2 className={classes.title}>Work with any team</h2>
                <p className={classes.p}>Whether it’s for work, a side project or even the next family vacation, 
                helps your team stay organized.</p> 
              </div>            
              <img
                className={classes.img}
                src="/image/about_slide3.png"
                alt="slide3"
              />
            </div>
          </div>          
          <div>
            <div className={classes.content}>
              <div className={classes.text}>
                <h2 className={classes.title}>Information at a glance</h2>
                <p className={classes.p}>Dive into the details by adding comments, 
                attachments, due dates, and more directly to cards. Collaborate on projects from beginning to end.</p> 
              </div>            
              <img
                className={classes.img}
                src="/image/about_slide4.png"
                alt="slide4"
              />
            </div>
          </div>               </Carousel>
        <div className={classes.buttons}>
          <Link to="/login"><Button className={classes.btn_login} type="primary" size="large">Log In</Button></Link>
          <Link to="/register"><Button  className={classes.btn_signup} type="primary" size="large">Sign Up</Button></Link>
        </div>
      </div>      
      <Footer />
    </div>
  );
};

export default About;
