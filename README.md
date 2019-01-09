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