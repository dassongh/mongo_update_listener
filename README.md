## Mongo collection update listener

### Overview

A simple Express server that creates from 1 to 10 random customers with a 200ms interval, and writes anonymized version
of a customer document to customer anonymized collection.

### Technologies and tools

- TypeScript - main programming language
- Node.js - runtime for application
- Express.js - backend framework
- MongoDB - main database
- Mongoose - library for working with Mongo
- Docker/Docker-compose - containerization tools

# Steps to run the project

- Clone repository
- `cd` into project directory
- run `docker compose up -d` to spin up db
- run `npm run build && npm start`
- go to `GET: localhost:4000/api/v1/customer-anonymized` to check new customers
