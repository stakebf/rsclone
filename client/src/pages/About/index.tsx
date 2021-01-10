import React from 'react';
import 'antd/dist/antd.css';
import classes from './About.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from 'antd';

const About: React.FC = () => {
  return (
    <div>
      <Header />
      <div className={classes.about}>
        <h2>Trello Clone</h2>
        <p>A project management board with draggable lists and cards.</p> 
        <p>Built with MERN (MongoDB, Express, React.js and Node.js).</p>
        <h2>Technical stack</h2>
        <ul>
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
            <li>React.js</li>
            <li>Redux</li>
            <li>React Beautiful DnD</li>
            <li>TypeScript</li>
            <li>Scss</li>
        </ul>
        <div className={classes.about__buttons}>
          <a href="/"><Button type="primary" size="large">Back Home</Button></a>
        </div>
      </div>      
      <Footer />
    </div>
  );
};

export default About;
