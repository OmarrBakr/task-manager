## Project Summary

This project is a Task Manager web application that allows users to create, update, view, and delete tasks. The platform supports user authentication, task categorization (e.g., completed, incomplete), and task assignment.

## Key Features
### 1. User Registration and Login:

  * Users can register with their name, email and password and log in to access their tasks.
    
### 2. Task Management:

  * **Create Task:** Users can create tasks with a title, description and completion status.
  * **View All Tasks:** Users can view all tasks, with the option to filter tasks based on their status (completed/incomplete/all).
  * **Update Task:** Users can update task details, including marking tasks as completed or incomplete.
  * **Delete Task:** Users can delete tasks they no longer need.
    
### 3. Authentication:

  * **JWT (JSON Web Token)** is used for secure user authentication.

## Installation and Setup
### 1. Install Dependencies

  * Navigate to the project directory and install the required dependencies using the following commands:

    * cd task-manager
    * npm install

### 2. Configure environment variables

  * Create a .env file in the root directory and add the following environment variables:

    * MONGO_URI = "mongodb://localhost:27017/task-manager"
    * PORT = 5000
    * JWT_SECRET = "8d810da6a5d6504c89fa78ccd3dc654fd09312a05436c0560df74ebff5166706"
    * JWT_LIFETIME = 1h

### 3. Start the application

  * Run the following command to start the server:
     * npm start

### 4. Documentation
  
  * *http://localhost:5000/api-docs/*
