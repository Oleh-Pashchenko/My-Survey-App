# Survey Application

This application consists of a backend (BE) and a frontend (FE) component. You can run both components either using Docker Compose or individually on your local machine.

## Running with Docker Compose

### Prerequisites

- Docker and Docker Compose installed.
- `.env` file configured for MongoDB.

### Setup and Run

1. **MongoDB Host Configuration**:  
   Ensure that the `.env` file contains the following line: `DB_HOST=mongo`

2. **Start the Application**:  
Navigate to the root directory of the project and run:
```bash
docker compose -f "docker-compose.yml" up -d --build
```
3. Restart Nginx Proxy (if needed):
In some cases, the Nginx proxy may not work correctly on the first start. If this happens, run:
```bash
docker-compose restart proxy
```

4. Access the Application:
Frontend: Open http://localhost in your web browser.
Swagger API Documentation: Accessible at http://localhost/api/docs.

## Running without Docker Compose

### Prerequisites

- Docker and Docker Compose installed.
- `.env` file configured for MongoDB.

### Setup and Run
#### Backend

1. Update .env for Backend: Before starting the backend, update the `.env` file to provide `DB_HOST`, `DB_DATABASE`, and `DB_PORT` for MongoDB.

2. Navigate to the Backend Directory: `cd be`.
3. Install Dependencies: `npm install`.  
4. Start the Backend (in development mode): `npm run dev`.

#### Swagger Documentation:
- Accessible at http://localhost:3000/api/docs.

#### Swagger Documentation:
- Run Tests `npm test`.

#### Frontend
1. Navigate to the Frontend Directory: `cd fe`.
2. Install Dependencies: `npm install`.  
3. Start the Backend (in development mode): `npm run dev`.
4. Access the Frontend: Open http://localhost:3001 in your web browser.

## Potential Improvements
- Relocate the frontend from Docker to a separate environment. Initially, it was integrated into Docker for simplicity and to maintain a single repository structure.
- Authentication with JWT: Implement JWT (JSON Web Tokens) to manage user authentication and securely know which user is operating.
- Enhanced Question Options: Expand the types of question options available in the survey and allow for custom answers to accommodate a wider range of survey types.
- Shared Interfaces: For this single-repo architecture, move the interfaces directory to a shared location accessible by both BE and FE. This promotes code reusability and consistency across the application.