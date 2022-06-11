# Nestjs Microservices

Microservice implementation using [NestJs](https://nestjs.com/), a node-js framework written with Typescript.\
This project is a research demo where I play around with various technologies related to microservice architecture.

## Context

Due to my current work with Electric vehicle charger, some of the services may contain [Open charge point protocol (OCPP)](https://www.openchargealliance.org/) related functionality to further my learning experience with knowledge useful for work.

## System design

### System architecture

[View in Whimsical](https://whimsical.com/nestjs-microservices-system-structure-NrFnsKBHSdFjstmWbRq2iJ)

![image](https://user-images.githubusercontent.com/22862227/173170226-ec6e347f-9259-4cfc-8f73-842574d8c62f.png)

### Gateway Service

The main implementation will be done using the [api-gateway pattern](https://microservices.io/patterns/apigateway.html), where all of the external requests communicate with a gateway service which then communicates with a corresponding microservice using whatever communication technology it may utilize.

In this project, the gateway will be another NestJs app that will redirect requests based on the request URI ([Gateway routing pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/gateway-routing)).

- `/auth/*` - Auth Service
- `/charger/*` - Charger Service
- `/transaction/*` - Transaction Service
- `/email/*` - Email Service

### Microservices

#### AuthService

Auth Service is a microservice responsible for authentication logic like user login and signup. The actual authentication will not be implemented to reduce project complexity, and instead the API will return faked data.

You can check out an example of jwt-based authentication with username-password based login in [this repository](https://github.com/Kwandes/nestjs-angular-authentication-demo)

The service will also feature simple healthcheck system for validating the status of the system.

The service will have database connection using TypeOrm to a schema called "authentication" where the user data will be stored.

Since the gateway service is responsible for all external communication with the system, it's failure would cause the entire system to not be accessible. Because of this it is kept as simple as possible to reduce complexity and chance of failure.

#### ChargerService

Charger service is a microservice responsible for getting and manipulating charger data.

The service will have database connection using TypeOrm to a schema called "ocpp" where the charger data will be stored.

#### ChargerService

Charger service is a microservice responsible for getting and manipulating transactions, aka charge sessions.

This is the most robust example of communication between microservices as it has to authenticate start transaction requests, fetch chargers to ensure the chargeId is valid, and handle events for `charger_updated`.

The service will have database connection using TypeOrm to a schema called "ocpp" where the charger data will be stored.

#### Email Service

Email Service is a microservice responsible for email-based communication. Emails would be sent on events like user signup. To reduce complexity, the email sending will not actually be implemented and fake data will be used.

The purpose of this service is to test message queues and event based communication between microservices.

### Event Bus

[View in Whimsical](https://whimsical.com/nestjs-microservices-system-structure-NrFnsKBHSdFjstmWbRq2iJ)

![image](https://user-images.githubusercontent.com/22862227/173170249-0a46c3b5-81a4-43a4-90af-8d5ca9a3c28e.png)

The Event bus is currently implemneted using TCP transport layer.
Not all serve actions emit events.\
Green dotted lines represent events that were not implemented since there is nothing listening to them.

#### Events

- `user_created` - triggers sending of a signup email in **EmailService**
- `charger_updated` - if status is `unavailable` then all transactions on that charger are stopped
- `transaction_started` - unhandled
- `transaction_updated` - if status is `inactive` then the transaction is stopped
- `transaction_stopped` - unhandled

Emitting events:

```ts
this.transactionServiceClient.emit("transaction_updated", {
  id: found.id,
  status: found.status,
  value: found.value,
});
```

Handling events:

```ts
  @EventPattern('transaction_updated')
  transactionUpdatedHandler(data: Record<string, unknown>): void {}
```

## Project setup and installation

### Prerequisites

Before you can run this project, you need to have the following things installed:

- Npm and Node - we recommend using [NVM (Linux, MacOS)](https://github.com/nvm-sh/nvm#about) or [NVM-Windows (Windows)](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows)

  > Use Node version `v16.14.0+`

### Installation

1. Clone the repo

```sh
git clone https://github.com/Kwandes/teststore.git
```

2. Install NPM packages

Since each service is its own nestjs application, there are multiple `package.json` files that have to be installed.
You can install all applications at once with

```sh
npm run install
```

3. Configure the app

Update the `.env` file if needed.

The app requires a PostgreSql database instance to connect to.

More information available in [Database section](#database)

5. Serve the apps

The system is composed of multiple apps which complicates running them. They also depend on each other, so it is best to run all of them. At minimum, the gateway service has to be run.

You can run all of the services at once with

```sh
npm run serve
```

Or run each app invidually with

```ts
npm run serve:gateway
npm run serve:auth
npm run serve:charger
npm run serve:transaction
npm run serve:email
```

> Each applciation has to be run in a seperate terminal
> The applications will re-build automatically on code changes

### Database

This project uses PostgreSQL for data persistance. Due to usage of TypeORM it can be easily swapped to another SQL database.

The [`.env.template`](./.env.template) file contains default database connection data that it will use to connect with by default. If you wish to supply your own credentials, create a `.env` file and include the relevant environment variables.

The project requires a Postgres database with the following schemas:

- `authentication` - used by AuthService
- `charger` - used by ChargerService
- `transaction` - used by TransactionService

To run a database locally via Docker you can use the following command:

```docker
docker run --name postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=authentication -p 5432:5432 -d postgres
```

You will need to connect to the database image and manually create a `ocpp` database within it.

After that the services should be abile to automatically connect to it with the default database information.

> Currently instead of implementing the database, the data is stored as a variables within the services. It gets reset every time you rerun/rebuild the service.

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
