# Node.js GMP Express application
## Version: 1.0.0

### /api/profile/cart

#### GET
##### Summary:

Get user cart or create if it is missing

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| x-user-id | header | User id (uuid) | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns user cart |
| 401 | Unauthorized (when no user matching authorization header is found) |
| 403 | Forbidden (when authorization header is missing) |
| 500 | Internal server error |

#### PUT
##### Summary:

Update user cart

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| x-user-id | header | User id (uuid) | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Cart can be updated in the following ways - 1) products can be added 2) products can be dropped 3) amount of product might have changed. Request body to be provided contains a snapshot of cart after changes. |
| 400 | Bad request |
| 401 | Unauthorized (when no user matching authorization header is found) |
| 403 | Forbidden (when authorization header is missing) |
| 404 | Not Found |
| 500 | Internal server error |

#### DELETE
##### Summary:

Empty user cart

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| x-user-id | header | User id (uuid) | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns success = true if cart was successfully emptied |
| 401 | Unauthorized (when no user matching authorization header is found) |
| 403 | Forbidden (when authorization header is missing) |
| 500 | Internal server error |

### /api/profile/cart/checkout

#### POST
##### Summary:

Create an order

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| x-user-id | header | User id (uuid) | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | Bad request |
| 401 | Unauthorized (when no user matching authorization header is found) |
| 403 | Forbidden (when authorization header is missing) |
| 500 | Internal server error |

### /api/products

#### GET
##### Summary:

Returns a list of products

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| x-user-id | header | User id (uuid) | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns a list of all products available |
| 401 | Unauthorized (when no user matching authorization header is found) |
| 403 | Forbidden (when authorization header is missing) |
| 500 | Internal server error |

### /api/products/{productId}

#### GET
##### Summary:

Returns single product

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| productId | path | Id (uuid) of product to return | Yes | number |
| x-user-id | header | User id (uuid) | Yes | string (uuid) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 401 | Unauthorized (when no user matching authorization header is found) |
| 403 | Forbidden (when authorization header is missing) |
| 404 | Not found |
| 500 | Internal server error |

### /api/auth/register

#### POST
##### Summary:

Create new user (for Module 9)

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns new user |
| 400 | Bad request |
| 500 | Internal server error |

### /api/auth/login

#### POST
##### Summary:

Login user (for Module 9)

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Returns new user |
| 404 | Bad request |
| 500 | Internal server error |
