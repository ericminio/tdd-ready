-pc for *politically correct*

[![Build Status](https://travis-ci.org/ericminio/tdd-ready.svg?branch=python-flask-vuejs-postgres-pc)](https://travis-ci.org/ericminio/tdd-ready)

## Openshift

One way to deploy deploy:
* for the api, build and deploy a python container based on this repo
* for the ui, build and deploy a nodejs container based on this repo with the env variable (build config):

VUE_APP_API_URL set with the api

DEV_MODE = true

## Project setup
```
npm install
```

### Start server
```
npm run server:start
```

### Start app
```
npm run client:start
```

### Compiles and minifies app for production
```
npm run build
```

### Run end-to-end tests
```
npm run test:e2e
```

### Run server tests
```
npm run test:server
```

### Run Vue tests
```
npm run test:vue
```
