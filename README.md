## Technologies Used

- **Node.js**: Runtime environment for executing JavaScript code on the server side.
- **TypeScript**: Superset of JavaScript that compiles to clean JavaScript output.
- **NestJS**: Framework for building efficient, reliable, and scalable server-side applications.
- **PostgreSQL**: Relational database management system for storing application data.
- **TypeORM**: ORM for TypeScript and JavaScript that works with various SQL databases.
- **Bcrypt**: Library for hashing passwords.


## Installation

1. **Clone the Repository**

   ```bash
git clone https://github.com/Hamidjon03/chess.git


2. **Install Dependencies**

npm install

3. **Set Up Environment Variables**

Create a .env file in the root directory and configure your database connection settings:

DATABASE_USER=yourusername
DATABASE_PASSWORD=yourpassword
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=chess

4. **Run Migrations**

npm run migration:run

5. **Seed the Database**

npm run seed:run

// after that some users and players will be added

6. **Start the Application**

npm run start:dev
