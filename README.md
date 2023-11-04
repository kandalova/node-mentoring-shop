# node-mentoring-shop
[https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/authorization/homework](https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/authorization/homework)

We are going to create an Express application for online shop which sells different types of products (like e.g Amazon).

In this task we will need to modify existing [Express application](https://github.com/kandalova/node-mentoring-shop/pull/3) by extending user model, adding authorization and authentication flows.

**Implementation criteria:**

- User entity is added - contains id, email (unique), password, role (admin or simple user). Password is stored as hashed value in the database.
-  [Bcrypt](https://www.npmjs.com/package/bcrypt) module is used for hashing passwords.
-  New API endpoint is added for user **sign up** by email and password e.g `/register`. It creates user entity in the database.
-  New API endpoint is added for user **sign in** by email and password e.g `/login`. It returns JWT token which contains user information. Pay attention that password is not encoded in token payload. JWT token expires in 2 hours.
-  JWT token is passed in `Authorization` header for each request (except sign in and sign up) in the following format `Authorization: Bearer <token>`
-  Authentication middleware is added to check if token provided is valid and if user encoded in token exists. If no, `401 Unauthorized` status code is returned. Otherwise, user can do action they intended to do.
-  Only admin users can delete user cart. Authorization middleware is added for this purpose. If token provided doesn't belong to admin member, `403 Forbidden` status code is returned.

**Setup for startring (once)**

In the project root folder

- Install [podman](https://podman.io/docs/installation)
- Install [podman-compose](https://github.com/containers/podman-compose#installation)
- Init podman machine `podman machine init`
- Install [MongoDB server](https://www.mongodb.com/try/download/community)
- Install MongoDB tools to connect to MongoDB: [Shell](https://www.mongodb.com/try/download/shell) or [Compass Gui](https://www.mongodb.com/try/download/compass)

**To start(every time)**
- `podman machine start` - start virtual machine
- `podman-compose up -d` - starts container from `docker-compose.yaml`
- `podman ps` - check running containers
- Connect to Mongo via Compass or shell `mongosh --port 27017`

[Running MongoDB as a Docker Container](https://www.baeldung.com/linux/mongodb-as-docker-container#2-building-container-using-a-compose-file)

**First time starting**
- Create your first database in MongoDB. Then, create your first collection (Example - User).
- It's possible to use seeder in `index.ts` to mock `Product` model.
- `Register` and `login` user, use returned token in requests's headers.


**API endpoints**

[swagger](https://github.com/kandalova/node-mentoring-shop/blob/task_6_shop_express.js/swagger.md)

<img width="729" alt="image" src="https://github.com/kandalova/node-mentoring-shop/assets/26093763/f1e36899-e171-436e-83c4-72dcb20264e2">

**Results**
