# Task Manager API

## A full-featured Restfull API.

## Features

⚡️ Rest API\
⚡️ Authentication\
⚡️ Database Support\
⚡️ Image Uploading\
⚡️ Pagination\
⚡️ Sorting\

To view a live example, **[click here](https://newest-task-manager.herokuapp.com/)**
---

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites 📋

You'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [NPM](http://npmjs.com)) installed on your computer.\

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

**NOTE**:
If your run into issues installing the dependencies with NPM, use this command:

```bash
# Install dependencies with all permissions
$ sudo npm install --unsafe-perm=true --allow-root
```

#### Once your server has started, you can access the api at `http://localhost:3000/` .
---

## Instructions:

### Step 1 - Registering

Do a post request at `https://localhost:3000/users/` with proper data to register a user.:

### Step 2 - Upload user avatar

Do a post request at `https://localhost:3000/users/me/avatar` with a file to upload it.

### Step 3 - Login 

Do a post request at `https://localhost:3000/users/login` with valid credentials.

### Step 4 - Taks Creation

Do a post request at `https://localhost:3000/tasks/` with valid details regardig the task.

---

## Testing 👥

You can test the Rest api using the jest test build using:

`npm run test`

## Authors

- **Laraib Siddiqui** - [https://github.com/laraib-sidd](https://github.com/laraib-sidd)

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
