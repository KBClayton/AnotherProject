# AnotherProject
JOBSKR is a web-based database management app to help people with ther career searches.  Users are able to input, update, and organize their job leads, and track them while logged in with a secure profile.  They are also able to search for different jobs using AuthenticJobs and USAJobs and can save those leads into their profile with the click of a button. 

Routes are served using express
The foundational database is 3 tables implemented in MySQL with sequelize: Users, Saved Jobs, and Comments. 
Sessions are managed with express-session
Salting and hashing is done with  s-salt-and-pepper
Bootstrap, jquery, are used client side to render pages
Handlebars is used server side for layouts

Deployed to: https://jobskr.herokuapp.com/

Alan Andrews- Handlebars and Data Interaction Management
Alex Bruner- Database Management, UI Designer
Jamie Reaves- Routes Management, Implementation of Job Search API
Kevin Clayton- Security and Login Administration

The JOBSKR desktop site was launched on July 28th, 2018 by a group of students at the University of Texas Coding Bootcamp.