# WebDev2FinalProject
# FMTracker

Team Roles:
Andrew Pullen - MongoDB database, integration
JP Pierce - Backend logic (Last.fm API), integration
Temitope Alabi - CSS, integration, front-end styling
Owen Bartle - Frontend Angular components, services, integration

Setup Instructions:
Download and unzip the project folder.

Navigate to the backend directory and run:
npm install

Navigate to the frontend directory and run:
npm install

The .env file should be included in the backend folder and contain:
LASTFM_API_KEY = 0d4215228da6018eb571808607a41201
MONGO_URI=mongodb+srv://apullen918:aDKTBwzOEmteagUf@fmcluster.84s2qrq.mongodb.net/FMTracker?retryWrites=true&w=majority&appName=FMCluster
JWT_SECRET=OurSecretKey123

In the backend directory, start the server:
node server.js

In the frontend directory, start the Angular app:
ng serve

Visit the frontend URL (http://localhost:4200) to use the app.



Deployment Link:
YouTube Presentation Link: