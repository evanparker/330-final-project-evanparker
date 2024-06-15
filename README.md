# 330-final-project-evanparker

Final Project for JSCRIPT 330 B Sp 24: Back-End Application Development With Javascript

## Project proposal

The intention of this project is to be the back end for an image sharing site for miniatures.

### Routes

- Images

  - Create: `POST /images` - requires authentication
  - Get all: `GET /images` - public

- Minis

  - Get all: `GET /minis` - public, should not include images
  - Get one: `GET /minis/:id` - public, should include images as objects
  - Create: `POST /minis` - requires authentication
  - Update: `PUT /minis/:id` - requires authentication
  - Delete: `DELETE /minis/:id` - requires authentication

- Figures

  - get all: `GET /figures`
  - get one: `GET /figures/:id`
  - create: `GET /figures/:id` - requires authentication
  - update: `GET /figures/:id` - requires authentication
  - Delete: `DELETE /figures/:id` - requires admin

- Manufacturers

  - get all: `GET /manufacturers`
  - get one: `GET /manufacturers/:id`
  - create: `POST /manufacturers` - requires admin
  - update: `PUT /manufacturers` - requires admin
  - Delete: `DELETE /manufacturers/:id` - requires admin

- Users

  - Get user's minis: `GET /users/:username/minis` - public, should provide a list of a user's minis

- Auth

  - Signup: `POST /auth/signup`
  - Login: `POST /auth/login`
  - Change Password `PUT /auth/password` - requires authentication

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

- Figures

  - `getAllFigures`
  - `getFigureById`
  - `createFigure`
  - `updateFigure`
  - `deleteFigure`

- Manufacturers

  - `getAllManufacturers`
  - `getManufacturerById`
  - `createManufacturer`
  - `updateManufacturer`
  - `deleteManufacturer`

- Users

  - `createUser`
  - `updateUser`
  - `findUserByUsername`
  - `findUserByEmail`

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
  - `token`

- Mini

  - `userId`
  - `images`: [Image]
  - `figureId`

- Figure

  - `name`: string
  - `images`: [Image]
  - `manufacturerId`

- Manufacturer

  - `name`: string
  - `images`: [Image]

## Self Evaluation

### What went well:

Tried test driven development for the minis routes, and once I got the advice to do one route at a time it went pretty smootly. Having the milestone in the middle of the project helped keep me on schedule.

### What didn't go well:

The project is pretty bare bones, and to be useful would need a few more optional fields added to the minis/images models. I feel never really learned _how_ to plan more complicated schemas, and some tools/references for visualizing them would have been useful.

There's still a lot of work to do to make this into a usable project. Ideally there'd be models for manufacturers, figures (and collections of figures), and paintjobs. I'd also like to find and efficent way to serve the first image of a mini for thumnbail purposes when getting multiple minis at once.
