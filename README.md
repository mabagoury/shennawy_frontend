# The Shennawy Frontend
Welcome to the Shennawy Frontend project, which is set up with Next.js app router, ESLint, and Prettier for seamless development and deployment. This project provides a ready-to-go setup for building and running the frontend, ensuring clean code and efficient development workflows.

# Prerequisites
Before you get started, ensure you have the following installed on your machine:

- Git
- Docker
- Docker Compose

# Project Setup
To run the project locally, you'll use Docker for a streamlined environment setup.

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/shennawy_frontend.git

   cd shennawy_frontend
   ```

2. Set up environment variables
Before running the project, you need to configure your environment variables. Copy the contents of the `.env.example` file into a new `.env` file and fill in the values for your environment.

3. Docker Setup
We have a docker-compose.yml file that sets up the frontend locally. To start the services in one command, run:

   ```bash
   docker-compose up
   ```

   This will build the service and start the container. By default, the Nex.js server should be available at http://localhost:3000.

4. Linting and Formatting
This project uses ESLint and Prettier to enforce consistent code style. To run the linter, use the following npm script:

   ```bash
   npm run lint
   ```