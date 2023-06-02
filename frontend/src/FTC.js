import React from 'react'
import Footer from './Footer';
import './FIRST.css';

function FTC() {
  return (
    <div>
      <h3>FIRST TECH Challenge</h3>
      <br />
      <div className='info'>
        <p>
          It’s way more than building robots. FIRST Tech Challenge teams (up to 15 team members, grades 7-12) are challenged to design, build, program, and operate robots to compete in a head-to-head challenge in an alliance format.
          Guided by adult coaches and mentors, students develop STEM skills and practice engineering principles, while realizing the value of hard work, innovation, and working as a team.
          The robot kit is reusable from year to year and can be coded using a variety of levels of Java-based programming. Teams design and build robots, raise funds, design and market their team brand, and do community outreach to earn specific awards. Participants are eligible to apply for $80M+ in college scholarships.
          <br/>Each season concludes with regional championship events and an exciting <a href='https://www.firstchampionship.org/'>FIRST Championship</a>.
        </p>
      </div>
      <div className='img-container'>
        <img src='./img/FIRST/FTC.jpg' width='350px' height='300px'/>
      </div>

      <br/>
      <Footer/>
    </div>
  )
}

export default FTC