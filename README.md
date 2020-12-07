# Task Manager API

## A full-featured Restfull API.

## Features

⚡️ Rest API\
⚡️ Authentication\
⚡️ Database Support\
⚡️ Image Uploading\
⚡️ Pagination\
⚡️ Sorting\
⚡️ Email Service


To view a live example, **[click here](https://newest-task-manager.herokuapp.com/)**
---

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites 📋

You'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [NPM](http://npmjs.com)) installed on your computer.

```
node@v10.16.0 or higher
npm@6.9.0 or higher
git@2.17.1 or higher
```
---

## How To Use 🔧

From your command line, first clone taskmanager:

```bash
# Clone this repository
$ git clone https://github.com/laraib-sidd/task_manager.git

# Go into the repository
$ cd task_manager
```

Then you can install the dependencies either using NPM or Yarn:

Using NPM:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm run develop
```

Using Yarn:

```bash
# Install dependencies
$ yarn

# Start development server
$ yarn develop
```
```
ApiKeys required:
* MongoDB URI
* Mailgun ApiKey
* Mailgun Domain 
```
**NOTE**:
If your run into issues installing the dependencies with NPM, use this command:

```bash
# Install dependencies with all permissions
$ sudo npm install --unsafe-perm=true --allow-root
```

#### Once your server has started, you can access the api at `http://localhost:3000/` .
---

## Instructions:

### Registering

Do a post request at `https://localhost:3000/user/register` with proper data to register a user.:

### Upload user avatar

Do a post request at `https://localhost:3000/user/me/avatar` with a file to upload it.

### Login 

Do a post request at `https://localhost:3000/user/login` with valid credentials.

### View Profile

Do a get request at `https://localhost:3000/user/me` with valid details regardig the task.

### Create a task

Do a post request at `https://localhost:3000/task/` with valid details regardig the task.

### Delete a task

Do a delete request at `https://localhost:3000/task/:id` with valid details regardig the task.

### Delete profile

Do a delete request at `https://localhost:3000/user/me` with valid details regardig the task.

---

## Postaman Collection

* Here is the shareble link to the postman collection with all the routes : [Colllection](https://www.postman.com/collections/e7f09c5a79610b7bca08)


## Testing 👥

You can test the Rest api using the jest test build using:

`npm run test`

## Authors

- **Laraib Siddiqui** - [https://github.com/laraib-sidd](https://github.com/laraib-sidd)

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
