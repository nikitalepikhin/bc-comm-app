# System for Communication Between Teachers and Students

## Bachelor's Thesis by Nikita Lepikhin (2022/2023)

### Launching the Application in a Local Environment over HTTP (Base = Required)

1. Make sure you have [node (version 18.12.1 LTS or higher)](https://nodejs.org/en/) and yarn (version 1.22.19 or higher) `npm i -g yarn` installed. Versions lower than specified may also work, however I have used these versions during development.

2. First, download PostgreSQL [here](https://www.postgresql.org/download/). Second, create a local PostgreSQL database. The easiest way is to install [pgAdmin 4](https://www.pgadmin.org/download/) and create a database there. Alternatively, you can spin up a Docker container with a PostgreSQL instance (see [this tutorial](https://hevodata.com/learn/docker-postgresql/#3steps) for reference). **Have a database connection string ready.**

3. If you wish to launch the backend app over HTTP, then copy the contents of the `/http/env-nest.txt` file into `/nest-backend/.env`. To launch the front end over HTTP copy the contents of `/http/env-react.txt` into `/frontend/.env`.

4. Copy the database URL into `/nest-backend/.env` under the `DATABASE_URL` property. The URL should look similar to `postgresql://user@localhost:5432/db-name`.

5. Navigate to the front-end root directory `/frontend` and install the dependencies `yarn install`.

6. Navigate to the back-end root directory `/nest-backend` and install the dependencies `yarn install`.

7. Apply database migrations and seed the database with `npx prisma migrate dev` from the `/nest-backend` directory.

8. Launch the front end with `yarn run start` from `/frontend`. Launch the back end with `yarn run start:dev` from `/nest-backend`.

9. You can access the app at [http://127.0.0.1:8080](http://127.0.0.1:8080) by default. **Do not use the `localhost:8080` URL in order for cookies to work!**

### Launching the Application in a Local Environment over HTTPS (Optional)

1. If you wish to launch the backend app over HTTPS, then copy the contents of the `/https/env-nest.txt` file into `/nest-backend/.env`. To launch the front end over HTTPS copy the contents of `/https/env-react.txt` into `/frontend/.env`.

2. To launch the app over HTTPS you will need to have a local certification authority (CA) installed. The local CA will be used to generate a self-signed certificate. For macOS please follow the instructions in [frontend readme](/frontend/readme.md) and [backend readme](/nest-backend/README.md) respectively. For Windows or Linux you will have to find some tutorial on how to generate a self-signed certificate. The front end will require a public and a private key pair. The back end will require a self-signed certificate installed in the system.

3. When launching the app over HTTPS, you will need to have a domain on which the app will be accessible. You may use any domain (for example, `commapp.com`) as long as you have modified the `hosts` file accordingly. The domain that you choose to use should point to `127.0.0.1`.

4. Run the back end with `yarn run start:dev`. Run the front end with `sudo yarn run start`. Adding elevated privileges (`sudo`) may be required to run the front end on port 443.

5. You can now access the app at [https://commapp.com](https://commapp.com) or the domain that you have specified in env files.
