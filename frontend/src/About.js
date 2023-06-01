import React from 'react'
import './About.css';
import TeamImg from './img/frc2023-team.jpg';
import Footer from './Footer';

function About() {
  return (
    <div className="container">

      <div className='about-container'>
        <h1>About Our Team:</h1>
      </div>

      <div className='team-img-container'>
        <img className='team-img' src={TeamImg} />
      </div>

      <div className='team-info'>
        <p className='d-flex justify-content-center align-items-center team-text'>FRC Team 7429 is a school-based team in Chesterfield, Va. Our teams home is at Chesterfield Tech Center [CTC @ HULL]. We are proud to be
          2022 District Event Champs of the Greater Richmond Events. With a few wins underneath our belts we see the need to be a student ran team
          and not just be a team that goes for the wins. We believe that STEM can be taught to anyone and we strive to show the community that a random group
          of students can be the greatest engineers in our time. Students work side by side with professional engineers who provide mentorship and support throughout the season. Though the mentors guide the students,
          we value a student driven team. Kids are always involved in important decision making and encouraged to learn through experience.
        </p>
      </div>
      <Footer/>
    </div>
  )
}

export default About