# node-mentoring-shop
https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/express-layered-architecture/task

We are going to create an Express application for online shop which sells different types of products (like e.g Amazon).

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
- Application is implemented following Three Layered Architecture. Layers are separated by file names. For example <code>xxx.repository.ts</code> contains functions to retrieve data (data access layer), <code>xxx.service.ts</code> contains services that implement business logic, <code>xxx.controller.ts</code> contains functions that manage status codes/responses returned (presentation layer).
- Data is stored either in memory or on file system.
- joi is used to validate data in PUT /api/profile/cart.
- Simple authentication middleware is added to check if user with such id exists. User id is passed in x-user-id header.
- Order entity has copy of products. If you have only product id in order, it may lead to inconsistency. For example, if user creates an order and after that price is changed, the order price shouldn't be changed.
- For ```DELETE``` ```/api/profile/cart``` soft-delete approach is be used. Make sure that client of your API will not know that soft-delete approach is used.

**API endpoints**

[swagger](https://github.com/kandalova/node-mentoring-shop/blob/task_6_shop_express.js/swagger.md)

<img width="729" alt="image" src="https://github.com/kandalova/node-mentoring-shop/assets/26093763/f1e36899-e171-436e-83c4-72dcb20264e2">
