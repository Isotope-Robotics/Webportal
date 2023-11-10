# Isotope Robotics Webportal

FRC Team 9709 and Management Portal

# Under The Hood:
The project is ran on two different "servers", the react dev server and the express API server. Each server is coded in Javascript using two different types
of frameworks, Express.JS and React.JS. 

### API Server:
The API server is a simple but functional API server coded in Node.JS using the Express.JS framework. All API calls are public and all data input is protected
via a session token and cookie that is generated at login. A MySQL server is the data store for all event data and any other misc. data that is needed for the
project.

### React Server:
The React server is development server that comes with a create-react-app and is purly for developmental use, or in our case production due to the simplicty of our project.


### Comming Soon!
- Match Scouting System
- Pit Scouting System
- Blogging System
- Detailed Scouting Results Page
- More Details About Our Team

## Want to Help?
Contact Ethen Brandenburg at: ebot14rocks@gmail.com or use the Pull Requests

# Setup:
1. CD into directory (frontend, server)
2. npm -i (install dependencies, only first time setup)
3. npm start for each server individually.
4. Play With React!
