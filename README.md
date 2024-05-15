# 330-final-project-evanparker
Final Project for JSCRIPT 330 B Sp 24: Back-End Application Development With Javascript


## Requirements

- Your project will require an Express API using:
  - Authentication and Authorization
  - 2 sets of CRUD routes (not counting authentication)
  - Indexes for performance and uniqueness when reasonable
  - At least one of text search, aggregations, and lookups
- You may use external data providers (APIs) if you can get yourself free trial/tier access
- Routes should be fully tested (project test coverage > 80%)
- You’ll demo your project to the class in week 10 (5 minutes)
  - Demonstrate how to interact with your API through either
    - A saved Postman collection
    - A very simple front-end project


## Project proposal

The intention of this project is to be the back end for an image sharing site for miniatures.

For this example the images will be urls to images hosted elsewhere (probably https://unsplash.com/)


### Routes

- Images
  - Create: `POST /images`

- Minis
  - Get all: `GET /minis` - public, should not include images
  - Get one: `GET /minis/:id` - public, should include images as objects
  - Create: `POST /minis` - requires authentication
  - Update: `PUT /minis/:id` - requires authentication
  - Delete: `DELETE /minis/:id` - requires authentication

- Users
  - Get user's minis: `GET /users/:username/minis` - public, should provide a list of a user's minis

- Auth
  - Signup: `POST /auth/signup`
  - Login: `POST /auth/login`
  - Change Password `PUT /auth/password`


### DAOS

- Images
  - `createImage`

- Minis
  - `getAllMinis`
  - `getMiniById`
  - `getMinisByUserId`
  - `createMini`
  - `updateMini`
  - `deleteMini`

- Users
  - `createUser`
  - `updateUser`
  - `getUserById`

- Tokens
  - `createToken`
  - `deleteToken`


### MODELS

- User
  - `username`: string, index, unique
  - `email`: string, index, unique
  - `password`: string, encrypt
  - `roles`: [string]
- Image
  - `image`: string
  - `userId`
- Token
  - `userId`
- Mini
  - `userId`
  - `images`: [Image]


## Task breakdown and timeline

### Week 7
- Implement Models
- Implement DAOS

### Week 8
- Implement Routes
- Set up deployment
- Start writing tests for routes
- **DUE**: Prototype/proof of concept

### Week 9
- Continue writing tests
- Polish DAOS and Routes
- Set up example postman calls

### Week 10
- Write Self Evaluation
- **DUE**: Project submission, presentations
  - ~5-8 minute presentation with slides and a demo.
  - Your project README should have a self-evaluation of your approach and results, what you learned, and what you would like to do differently or improve upon. Explain what worked well and what didn't. The expectation is that this will not be a brief statement.


## Self Evaluation