# React Shared Hosting Platform

Welcome to the React Shared Hosting Platform! This platform allows you to deploy your ReactJS build files and have them live on the internet with assigned subdomains. This project is built using Node.js, Express, ReactJS, MongoDB, and Docker.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following tools installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/bugtech-systems/webhosting.git
```

### Navigate to the Project
```bash
cd webhosting
```

### Configure Environment Variables
Create a .env file in the backend directory and set the following environment variables:
```env
JWT_SECRET=Wildcrack@420
PRIMARY_STRING=<YourMongoDBConnectionString>
```

### Build and Run with Docker Compose
Execute the following command to build and run the project using Docker Compose:

```
docker-compose up --build
```

#### Note:
This project was created as a test project for a technical exam.
