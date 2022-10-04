<img align="left" src="https://user-images.githubusercontent.com/49886317/167458500-afb27fb0-2903-4b08-a5a4-0cdd81d8be07.png" height="128">

# Sith4 API
_The REST API using at backend of [sith4](https://github.com/ae-utbm/sith4)_

## Installation

```bash
$ npm install
```

## Migration of database

```bash
$ npm run migrate:dev
```

## Setup development environment and dependencies

```bash
docker-compose -f docker-compose.dev.yml up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```