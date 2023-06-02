import React from 'react'
import Footer from './Footer';

function FRC() {
  return (
    <div>
      <h3>FIRST Robotics Competition</h3>
      <br />
      <div className='info'>
        <p>
          Combining the excitement of sport with the rigors of science and technology. We call FIRST Robotics Competition the ultimate Sport for the Mind. High-school student participants call it “the hardest fun you’ll ever have.”
          Under strict rules, limited time and resources, teams of students are challenged to raise funds, design a team "brand," hone teamwork skills, and build and program industrial-size robots to play a difficult field game against like-minded competitors. It’s as close to real-world engineering as a student can get. Volunteer professional mentors lend their time and talents to guide each team. Each season ends with an exciting FIRST Championship.
          <br />Each season concludes with regional championship events and an exciting <a href='https://www.firstchampionship.org/'>FIRST Championship</a>.
        </p>
      </div>
      <div className='img-container'>
        <img src='./img/FIRST/FRC.jpg' width='400px' height='300px' />
      </div>

      <br />
      <Footer />
    </div>
  )
}

export default FRC