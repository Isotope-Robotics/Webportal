import React from 'react'
import './FIRST.css';
import Footer from './Footer';

function FLL() {
  return (
    <div>
      <h3>FIRST LEGO Leauge</h3>
      <br />
      <div className='info'>
        <p>FIRST LEGO League introduces science, technology, engineering and math (STEM) to children ages 4-16* through fun, exciting hands-on learning. FIRST LEGO League participants gain real-world problem-solving experiences through a guided, global robotics program, helping today’s students and teachers build a better future together. In FIRST LEGO League, students engage in hands-on STEM experiences, building confidence, growing their knowledge and developing habits of learning. FIRST LEGO League’s three divisions inspire youth to experiment and grow their critical thinking, coding and design skills through hands-on STEM learning and robotics.
          FIRST LEGO League Discover - PreK- Grade 1:
          For children ages 4-6, this playful introductory STEM program ignites their natural curiosity and builds their habits of learning with hands-on activities in the classroom and at home using LEGO® Duplo bricks.
          FIRST LEGO League Explore - Grades 2-4:
          In Explore, teams of students ages 6-10 focus on the fundamentals of engineering as they explore real-world problems, learn to design and code and create unique solutions made with LEGO bricks and powered by a LEGO Education robot.
          FIRST LEGO League Challenge - Grades 4-8:
          Friendly competition is at the heart of Challenge, as teams of students ages 9-16* engage in research, problem-solving, coding and engineering – building and programming a LEGO robot that navigates the missions of a robot game. As part of Challenge, teams also participate in a research project to identify and solve a relevant real-world problem.
         <br/> *Ages vary by country <br/>
          Interested in FIRST LEGO League outside United States and Canada? Learn more at <a href='https://www.firstlegoleague.org'>www.firstlegoleague.org</a>
        </p>
      </div>

      <div className='img-container'>
        <img src='./img/FIRST/FLL.png' width='250px' height='300px'/>
      </div>

      <br/>
      <Footer/>
    </div>
  )
}

export default FLL