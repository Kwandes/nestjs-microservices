# Nestjs Microservices

Microservice implementation using [NestJs](https://nestjs.com/), a node-js framework written with Typescript.\
This project is a research demo where I play around with various technologies related to microservice architecture.

## Context

Due to my current work with Electric vehicle charger, some of the services may contain [Open charge point protocol (OCPP)](https://www.openchargealliance.org/) related functionality to further my learning experience with knowledge useful for work.

## System design

_Made using whimsical_
![image](https://user-images.githubusercontent.com/22862227/173121288-778ff7b2-420f-4ebe-bd1f-6716fc5688fb.png)

### Gateway Service

The main implementation will be done using the [api-gateway pattern](https://microservices.io/patterns/apigateway.html), where all of the external requests communicate with a gateway service which then communicates with a corresponding microservice using whatever communication technology it may utilize.

In this project, the gateway will be another NestJs app that will redirect requests based on the request URI ([Gateway routing pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/gateway-routing)).

- `/auth/*` - Auth Service
- `/ocpp/*` - Charger Service
- `/email/*` - Email Service

### Microservices

#### AuthService

Auth Service is a microservice responsible for authentication logic like user login and signup. The actual authentication will not be implemented to reduce project complexity, and instead the API will return faked data.

You can check out an example of jwt-based authentication with username-password based login in [this repository](https://github.com/Kwandes/nestjs-angular-authentication-demo)

The service will also feature simple healthcheck system for validating the status of the system.

The service will have database connection using TypeOrm to a schema called "authentication" where the user data will be stored.

Since the gateway service is responsible for all external communication with the system, it's failure would cause the entire system to not be accessible. Because of this it is kept as simple as possible to reduce complexity and chance of failure.

#### ChargerService

Charger service is a microservice responsible for getting and manipulating charger data as well as tarnsactions, aka charge sessions.

The service will have database connection using TypeOrm to a schema called "ocpp" where the charger data will be stored.

#### Email Service

Email Service is a microservice responsible for email-based communication. Emails would be sent on events like user signup. To reduce complexity, the email sending will not actually be implemented and fake data will be used.

The purpose of this service is to test message queues and event based communication between microservices.

## Database

This project uses PostgreSQL for data persistance. Due to usage of TypeORM it can be easily swapped to another SQL database.

The [`.env.template`](./.env.template) file contains default database connection data that it will use to connect with by default. If you wish to supply your own credentials, create a `.env` file and include the relevant environment variables.

The project requires a Postgres database with the following schemas:

- `authentication` - used by AuthService
- `ocpp` - used by ChargerService

To run a database locally via Docker you can use the following command:

```docker
docker run --name postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=authentication -p 5432:5432 -d postgres
```

You will need to connect to the database image and manually create a `ocpp` database within it.

After that the services should be abile to automatically connect to it with the default database information.
