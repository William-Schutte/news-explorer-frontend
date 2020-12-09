import React from 'react'
import './About.css'
import profilepic from '../../images/me.jpg'

const About = () => {
  return (
    <section className="about">
      <img className="about__pic" src={profilepic} alt="A cool pic of the author" />
      <div className="about__info">
        <h3 className="about__title">About the author</h3>
        <p className="about__text">Hey there! I'm William Schutte, a full stack web developer. I work mostly with React, Express, and Node, and am fluent in JavaScript, HTML, and CSS.</p>
        <p className="about__text">I developed this capstone project at the end of my course at Practicum, an online educational platform that incorporates guided coding lessons and independent projects reviewed by real developers.</p>
      </div>
    </section>
  )
}

export default About
