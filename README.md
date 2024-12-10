# Research and Consultancy Management Portal  

## Overview and Introduction  

The **Research and Consultancy Management Portal** is a robust platform tailored for academic institutions to manage the lifecycle of research and consultancy projects. The portal is designed to address the inefficiencies and complexities involved in manual data handling. It empowers faculty to track their projects effortlessly and provides administrators with powerful tools to oversee, manage, and report project-related activities.  

Key features include:  
- **Dynamic Fund Management**: Tracks fund allocation, utilization, and remaining balances for research and consultancy projects.  
- **Role-Based Access Control**: Faculty have read-only access, while administrators can edit, update, and manage all data.  
- **Compliance Monitoring**: Ensures timely submission of Utilization Certificates (UCs) and compliance with funding agency requirements.  
- **Centralized Data Storage**: Houses project proposals, fund details, and compliance records securely.  

The platform is built using a modular architecture, ensuring scalability, flexibility, and robust performance.  

---

## Interface

- **HomePage**:
  
    ![Alt Text](https://github.com/amankr2076/Research-and-Consultancy-Management-Portal/blob/main/images/homePage.jpg)

- **Projects Page**

    ![Alt Text](https://github.com/amankr2076/Research-and-Consultancy-Management-Portal/blob/main/images/projects%20Page.jpg)

- **Admin Dashboard**

    ![Alt Text](https://github.com/amankr2076/Research-and-Consultancy-Management-Portal/blob/main/images/admin%20Dashboard.jpg)

- **Manage Documents Page**

    ![Alt Text](https://github.com/amankr2076/Research-and-Consultancy-Management-Portal/blob/main/images/manageDocuments%20Page.jpg)





  ---




## System Architecture  

### Front End  
The frontend provides a user-friendly interface for all stakeholders, ensuring that faculty and administrators can access relevant data with ease.  

- **Technology Stack**:  
  - React.js for building dynamic and responsive user interfaces.  
  - Redux for state management to handle complex application data flows.  
  - CSS and Tailwind CSS for modern, responsive, and visually appealing designs.  
- **Features**:  
  - Role-based dashboards for faculty and administrators.  
  - Clean, intuitive design for effortless navigation.  
  - Integration with the backend for real-time data synchronization.  

### Back End  
The backend is responsible for handling business logic, processing user requests, and ensuring secure data transactions.  

- **Technology Stack**:  
  - Node.js and Express.js for building a fast, scalable server.  
  - MySQL for a relational and structured database design.  
  - JWT (JSON Web Tokens) for secure authentication and session management.  
- **Features**:  
  - API endpoints to manage research and consultancy data.  
  - Secure user authentication and authorization.  
  - Role-based access to data for faculty and administrators.  

### Database  
The database is structured to maintain the relationships between faculty, projects, funds, and compliance data.  

- **Technology Used**: MySQL  
- **Key Tables**:  
  - `projects`: Stores project details such as title, funding agency, and status.  
  - `funds`: Tracks fund allocation and utilization.  
  - `faculty`: Maintains faculty profiles and project roles.  
  - `compliance`: Records the status of Utilization Certificates and compliance submissions.  

---

## Frontend Functionalities  

### Roles  
1. **Faculty (Read-only Access)**  
   - **Profile Management**: Faculty can view their profiles, including name, department, and ongoing projects.  
   - **Project Tracking**: Access project details, including timelines, funds allocated, and progress status.  
   - **Fund Details**: View the breakdown of allocated and utilized funds for each project.  
   - **Compliance Monitoring**: Check the status of Utilization Certificates and compliance submissions for their projects.  

2. **Admin (Full Access)**  
   - **Project Management**: Add, edit, and delete projects as needed.  
   - **Fund Allocation and Monitoring**: Update fund details dynamically, including sub-head allocations and utilization tracking.  
   - **Compliance Oversight**: Monitor and update compliance records, including UC submissions and reminders.  
   - **Reporting**: Generate detailed reports on project progress, fund usage, and compliance.  

---

## Backend Functionalities  

- **Authentication**:  
  - Secure user login with JWT-based token authentication.  
  - Role-based access to restrict faculty to read-only operations while granting admins full control.  

- **Fund Management**:  
  - API endpoints to update fund allocations, track sub-head utilization, and maintain overall fund balances.  
  - Dynamic sub-head addition to accommodate evolving project needs.  

- **Compliance Tracking**:  
  - Maintain records for Utilization Certificates and generate alerts for pending submissions.  
  - Store compliance documents and provide easy retrieval for reporting.  

- **Project Lifecycle Management**:  
  - Manage project statuses from proposal to completion.  
  - Store project-related documents, including proposals and reports, with database pointers.  

---

## Installation Steps  

### Prerequisites  
Ensure the following are installed on your system:  
- Node.js (latest stable version)  
- MySQL server (configured and running)  
- Git  
 

### Installation Commands  

- **Install all dependencies**  
   ```bash  
   npm install
   ```
- **To run the server**
  ```bash
   npm run dev
  ```
- **To run the client**
  ```bash
  npm start
  ```
4. **Access the Application**
  - Open your browser and navigate to http://localhost:3000 to view the portal.





   
