# node-mentoring-shop
[https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/nosql/homework](https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/nosql/homework)

We are going to create an Express application for online shop which sells different types of products (like e.g Amazon).

In this task we will modify the application we created in [Express and Layered Architecture](https://github.com/kandalova/node-mentoring-shop/pull/1)  module by moving data storage to NoSQL database.

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
- Data is stored in `MongoDB` database.
- `Docker` image is used for local development (check Running [MongoDB as a Docker Container](https://www.baeldung.com/linux/mongodb-as-docker-container#2-building-container-using-a-compose-file) for an example of docker-compose file).
- `Mongoose` is used as ODM for querying.
- `Data Access Layer` is rewritten to query `MongoDB`.
- Models are created based on entity schemas used in Express and Layered Architecture module.
- Models have proper relations between each other based on information specified above.

**API endpoints**

[swagger](https://github.com/kandalova/node-mentoring-shop/blob/task_6_shop_express.js/swagger.md)

<img width="729" alt="image" src="https://github.com/kandalova/node-mentoring-shop/assets/26093763/f1e36899-e171-436e-83c4-72dcb20264e2">

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

**Results**

![image](https://github.com/kandalova/node-mentoring-shop/assets/26093763/9e525a2f-c86b-4ecd-9f4e-5f8fe95a6904)

