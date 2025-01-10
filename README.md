# NestJS Book CRUD Application

A simple CRUD application built with **NestJS** for managing books. It uses **PostgreSQL** as the database and includes features like creating, reading, updating, and deleting books.

## Features

- **Create** a new book with details like title, author, genre, and year of publication.
- **Read** book information, including all books or specific books by ID.
- **Update** existing book details.
- **Delete** books.
- Integrated with **PostgreSQL** for database operations.
- Authentication and authorization using **JWT** (JSON Web Tokens).

## Technologies Used

- **NestJS**: Framework for building scalable server-side applications.
- **PostgreSQL**: Relational database.
- **TypeORM**: ORM for managing database interactions.
- **Node.js**: Backend runtime environment.
- **JWT**: For user authentication and authorization.

## Postman Usage

You can use **Postman** to test the API endpoints locally. Here's how:

### 1. **Create a JWT Token**
To interact with protected routes (CRUD operations), you first need to authenticate and receive a JWT token.

- Send a `POST` request to `http://localhost:3000/auth/login` with the following body:

```json
{
  "username": "testuser",
  "password": "yourpassword"
}
The response will contain a JWT token. Use this token to authorize subsequent requests.

2. Using the JWT Token
Once you have the JWT token, you can use it in the Authorization header of your requests.

In Postman, go to the Authorization tab.
Choose Bearer Token from the dropdown.
Paste the JWT token you received from the login endpoint.
3. Testing the CRUD Endpoints
Create Book (POST /book)

URL: http://localhost:3000/book
Body (JSON):
json
Copy code
{
  "title": "Test Book",
  "author": "Author Name",
  "genre": "Fiction",
  "yearPublished": 2021
}
Get All Books (GET /book)

URL: http://localhost:3000/book
Get Book by ID (GET /book/:id)

URL: http://localhost:3000/book/{bookId}
Update Book (PUT /book/:id)

URL: http://localhost:3000/book/{bookId}
Body (JSON):
json
Copy code
{
  "title": "Updated Book Title",
  "author": "Updated Author",
  "genre": "Updated Genre",
  "yearPublished": 2022
}
Delete Book (DELETE /book/:id)

URL: http://localhost:3000/book/{bookId}
Prerequisites
Before getting started, make sure you have the following installed:

Node.js (v14+ recommended)
PostgreSQL installed locally or on a server.
Postman installed for testing the API.
Basic understanding of NestJS and PostgreSQL.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Shubham06-op/Nestjs-Book-CRUD.git
cd nestjs-book-crud
Install dependencies:

bash
Copy code
npm install
Set up the PostgreSQL database: Make sure you have PostgreSQL running and configure the database connection in the ormconfig.json or .env file with your database details.

Run the application:

bash
Copy code
npm run start
The application should now be running at http://localhost:3000. You can access the API endpoints using Postman.


