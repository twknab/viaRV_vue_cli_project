# ViaRV Vue + Webpack Project:

This project is a client-side only demo of a Vue.js project using Webpack to bundle assets. Element UI is used as a css framework on pages, and Vue CLI was used to build this project and create its folder heirarchy.

You can run the project locally by cloning this repository, and running the commands below:

## Installation

### Project setup

```javascript
npm install
```

### Run JSON server

(This will give us a mock API we can store and retrieve data from)

```javascript
json-server --watch db.json
```

### Compiles and hot-reloads for development

```javascript
npm run serve
```

### Compiles and minifies for production

```javascript
npm run build
```

## More about this Project

### Components

This project is built using components and views as `.vue` files. HTML is laid out in `<template>` tags, and various methods are contained within the scope of each component.

This project uses the following technologies:

- Vue.js is used for the front-end JavaScript Framework.
- Element UI for the visual look and feel of elements, as the CSS framework.
- JSON Server as our mock API to serve and store users.
- Axios to perform our AJAX requests, maintaining our SPA's (Single Page Application's) client-side rendering only.
- Vue Router is used to handle client-side rendering.
- Vue CLI was used to build project base and folder structure.

### Registration & Login Validations

There are some validations in place for registration and login (front-end only):

- All fields are required.
- Email must be at least 5 characters.
- First and last name must be at least 2 characters.
- Password must be at least 6 characters.
- Phone number must be ast least 10 characters.

Notes about this front-end validation:

- I just quickly implemented a solution, I understand that this code could be modularized and cleaned up. I also understand there are more native ways of doing front-end validation, for example Element UI has a way which provides field-specific error messages. This would probably be a better implementation.

### A Note About Users and Passwords

Because this project does not have a backend, I did not do any encryption and concatenate salts to any user passwords. Passwords are stored in `db.json` as-is. I understand this is extremley insecure and was just done for simplicity's sake for this demo. In a real world scenario, these passwords would be encrypted when stored in the DB, and compared with the user supplied password upon logging in.