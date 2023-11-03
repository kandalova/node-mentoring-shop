# node-mentoring-shop
[https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/authorization/homework](https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/authorization/homework)

We are going to create an Express application for online shop which sells different types of products (like e.g Amazon).

In this task we will need to modify existing [Express application](https://github.com/kandalova/node-mentoring-shop/pull/3) by extending user model, adding authorization and authentication flows.

**Implementation criteria:**

- User entity is added - contains id ([uuid](https://www.npmjs.com/package/uuid)), email (unique), password, role (admin or simple user). Password is stored as hashed value in the database.
-  [Bcrypt](https://www.npmjs.com/package/bcrypt) module is used for hashing passwords.
-  New API endpoint is added for user **sign up** by email and password e.g `/register`. It creates user entity in the database.
-  New API endpoint is added for user **sign in** by email and password e.g `/login`. It returns JWT token which contains user information. Pay attention that password is not encoded in token payload. JWT token expires in 2 hours.
-  JWT token is passed in `Authorization` header for each request (except sign in and sign up) in the following format `Authorization: Bearer <token>`
-  Authentication middleware is added to check if token provided is valid and if user encoded in token exists. If no, `401 Unauthorized` status code is returned. Otherwise, user can do action they intended to do.
-  Only admin users can delete user cart. Authorization middleware is added for this purpose. If token provided doesn't belong to admin member, `403 Forbidden` status code is returned.

**API endpoints**

[swagger](https://github.com/kandalova/node-mentoring-shop/blob/task_6_shop_express.js/swagger.md)

<img width="729" alt="image" src="https://github.com/kandalova/node-mentoring-shop/assets/26093763/f1e36899-e171-436e-83c4-72dcb20264e2">

**Results**
