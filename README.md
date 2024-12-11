# Nitk Club Recruitments Portal

## Table of Contents
- [Overview](#overview)
- [Demo Video](#demo-video)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-setup)
- [Running the Application](#running-the-application)
- [Contacts](#contacts)

## Overview
The Nitk Club Recruitment Portal is a web-based application designed to streamline and manage the recruitment process for various clubs at NITK. It allows students to apply for club positions, facilitates round-wise shortlisting, and provides an intuitive interface for both admins and users. 

## Demo Video
https://drive.google.com/file/d/1JU-67k7BVTULWXSeKveyiBpKWjdr6Uu1/view?usp=sharing

## Features
- **Club Registration**: Club admins can register their club for recruitments
- **Students Announcements**: Students can view the announcements made by different clubs.
- **Club/Sigs preference Form**: Admin can release preference form which students can fill based on their choices.
- **Recruitment Details**: Club Admins can track every stage of the recruitment process with dedicated tools.
- **Student Login**: Secure Login Authentication using JSON Web Tokens(JWT).
- **Recruitment Rounds**: Clubs can define any number of rounds and monitor the progress and status of each student at every stage.
- **Final Announcements**: Clubs can Generate and export the final list of selected students in Excel format with a single click.
- **Integrated Calendar**: Simplify planning by providing students with an integrated calendar view for schedules and event timings.

## Technologies Used

### Backend:
- Node.js
- Express.js

### Frontend:
- HTML
- CSS
- Vanilla JavaScript

### DataBase:
- MongoDB

### Authentication:
- JSON Web Tokens(JWT)

### Middleware:
- CORS

## Installation and Setup

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/SRIRAM231005/Nitk_Club_Recruitment_Portal_Project.git
   cd Nitk_Club_Recruitment_Portal_Project
   ```

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file with the following variables:
   ```plaintext
   JWT_SECRET=<your_secret_key>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../ClubRecFrontend
   ```

2. Open the HTML files in any browser, or use a live server extension for dynamic content loading.

---

## Running the Application
1. Start the backend server:
   ```bash
   cd ClubRecBackend
   npm start
   ```

2. Open the `index.html` file located in the `ClubRecFrontend` folder in your browser to interact with the application.

---

## Contacts
- email: sriram.bangam@gamil.com
