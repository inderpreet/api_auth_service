# Authentication Service using JWT and bcrypt for REST Proxy using express

This is a basic template for creating an app for authentication proxy.

## Routes

### register new user

localhost:3000/api/user/register

sample POST request body

`{ "name": "Test User", "email": "test@gmail.com", "password": "123456" }`

RESPONSE should be a user ID in Database

### Login

localhost:3000/api/user/login

sample POST request body

`{ "email": "test@gmail.com", "password": "123456" }`

RESPONSE should be a JWT(Token)

### Validate and request data

localhost:3000/api/data

GET request with `auth-token` in header set to auth token from login request

## Notes

The Express server uses the express.json() that allows it to parse all requests as JSON

The MongoDB config is saved in the .env file and takes from the Users Model which has:

- name: String
- email: String
- password: Hash as String
- date: Date

DB(MONGOOSE) -> USER MODEL -> AUTH ROUTE -> EXPRESS

### /api/user - authRoutes

#### register

- Route to create a new user into the database
- Validate using JOI, check if email exisits and then create new user
- use bcrypt
- Async calls to database

#### login

- validate username from boday with db
- validated password using bcrypt.compare
- create a JWT using `jsonwebtoken` library, sign and then send back token

## Reference

- Hapi-Joi for validation
- Mongoose for DB
- bcrypt for encryption

## Author

- Inderpreet Singh
