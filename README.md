# VelociRaffle

[VelociRaffle](http://www.velociraffle.com/) is a non-profit that raffles off sweet prizes and donates the profits to a charity of one of the participant's choosing.

The reasons behind starting VR are: have fun, learn, and use skills for charitable causes.

## Starting the server

* `$ npm i`
* `$ npm i nodemon jscs -g`
* Set up environment variables in `.env`

```
NODE_ENV=development
```

* In one Terminal instance, run `$ npm run dev-server`
* In another instance, run `$ npm run dev-client`

## Contributing

* All contributions must be well tested
* Linting must pass
  * Run via `$ npm run lint`
* All tests must be passing
  * Run via `$ npm test`

## Creating a new component

* `$ gulp component --name my.new.component`
* Optionally, can choose which folder. Base path is `~/client/app/components`
* To create a new component called `another.component` inside the `shared` folder, run `$ gulp component --name another.component --parent ../shared`

## Creating a new service

* `$ gulp service --name my.new.service`
* Optionally, can choose which folder. Base path is `~/client/app/shared/services`
* To create a new service called `another.service` inside the `components/sign.up` folder, run `$ gulp service --name another.service --parent ../../components/sign.up`

## Testing

### General

* Run the test suite: `$ npm test`
* If you do not know how to test something but know it should be tested, add a pending test.
