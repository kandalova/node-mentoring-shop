# node-mentoring-shop
[https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/express-layered-architecture/task](https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/rdbms/homework)

We are going to create an Express application for online shop which sells different types of products (like e.g Amazon).

In this task we will need to modify the application our created in [Express and Layered Architecture module](https://github.com/kandalova/node-mentoring-shop/pull/1)  by moving data storage to Relational database.

The application has 4 primary entities:

<code>User</code> - can add some products to the cart and then order them ([scheme](https://github.com/kandalova/node-mentoring-shop/blob/task_6_shop_express.js/src/scheme/UserScheme.ts)).

<code>Product</code> - represents product information that user can order ([scheme](https://github.com/kandalova/node-mentoring-shop/blob/task_6_shop_express.js/src/scheme/ProductScheme.ts)).

<code>Cart</code> - contains a list of products and their amount that user wants to order ([scheme](https://github.com/kandalova/node-mentoring-shop/blob/task_6_shop_express.js/src/scheme/CartScheme.ts)).

<code>Order</code> - contains list of products from cart that user has ordered ([scheme](https://github.com/kandalova/node-mentoring-shop/blob/task_6_shop_express.js/src/scheme/OrderScheme.ts)).

**Relations between entities:**

Each <code>User</code> can have only one non-deleted <code>Cart</code> at a time.
Each <code>Cart</code> is attached to a specific <code>User</code>.

One <code>User</code> can have multiple <code>Order</code>. Each <code>Order</code> is attached to a specific <code>User</code>.

<code>Cart</code> contains a list of products that user wants to order with the amount of those products specified.

**Implementation criteria:**

- TypeScript is used.
- Data is stored in `PostgreSQL` database.
- `Docker image` is used for local development.
- `ORM` is used to query data (Mikro-ORM).
- `Migrations` are used to create and delete tables (Mikro-ORM).
- `Seeds` are used to populate database with test data, e.g products ( Mikro-ORM)
- If Mikro-ORM is used, type-safe relations and collections are used.

**API endpoints**

[swagger](https://github.com/kandalova/node-mentoring-shop/blob/task_6_shop_express.js/swagger.md)

<img width="729" alt="image" src="https://github.com/kandalova/node-mentoring-shop/assets/26093763/f1e36899-e171-436e-83c4-72dcb20264e2">

**DB Diagram**

![2023-10-25_15h52_28](https://github.com/kandalova/node-mentoring-shop/assets/26093763/264f07d4-794f-4c8b-bd28-edbee1c82ac7)
