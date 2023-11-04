---
title: shop api v1.0.0
language_tabs:
  - "'http": HTTP'
language_clients:
  - "'http": ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="shop-api">shop api v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="shop-api-cart">cart</h1>

## get__api_profile_cart

> Code samples

`GET /api/profile/cart`

*Get user cart or create if it is missing*

> Example responses

> 200 Response

```json
{
  "data": {
    "cart": {
      "id": "6546650c159ab6e8bb59f925",
      "items": [
        {
          "product": {
            "id": "65426846103aa5e276433519",
            "title": "Book",
            "description": "Interesting book",
            "price": 200
          },
          "count": 2
        }
      ]
    },
    "total": 400
  },
  "error": null
}
```

> 401 Response

```json
{
  "data": null,
  "error": {
    "message": "Token is required"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "Invalid Token"
  }
}
```

> 500 Response

```json
{
  "data": null,
  "error": {
    "message": "Internal Server error"
  }
}
```

<h3 id="get__api_profile_cart-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns user cart|[CartResponse](#schemacartresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no token is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when token is missed or invalid)|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## put__api_profile_cart

> Code samples

`PUT /api/profile/cart`

*Update user cart*

> Body parameter

```json
{
  "productId": "65426846103aa5e276433519",
  "count": 5
}
```

<h3 id="put__api_profile_cart-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UpdateCartRequestBody](#schemaupdatecartrequestbody)|false|none|

> Example responses

> 200 Response

```json
{
  "data": {
    "cart": {
      "id": "6546650c159ab6e8bb59f925",
      "items": [
        {
          "product": {
            "id": "65426846103aa5e276433519",
            "title": "Book",
            "description": "Interesting book",
            "price": 200
          },
          "count": 2
        }
      ]
    },
    "total": 400
  },
  "error": null
}
```

> 400 Response

```json
{
  "data": null,
  "error": {
    "message": "Products are not valid"
  }
}
```

> 401 Response

```json
{
  "data": null,
  "error": {
    "message": "Token is required"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "Invalid Token"
  }
}
```

> 404 Response

```json
{
  "data": null,
  "error": {
    "message": "Cart was not found"
  }
}
```

> 500 Response

```json
{
  "data": null,
  "error": {
    "message": "Internal Server error"
  }
}
```

<h3 id="put__api_profile_cart-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Cart can be updated in the following ways - 1) products can be added 2) products can be dropped 3) amount of product might have changed.|[CartResponse](#schemacartresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|[CartResponse](#schemacartresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no token is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when token is missed or invalid)|[CartResponse](#schemacartresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## delete__api_profile_cart

> Code samples

`DELETE /api/profile/cart`

*Empty user cart*

<h3 id="delete__api_profile_cart-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-user-id|header|string|true|User id|

> Example responses

> 200 Response

```json
{
  "data": {
    "success": true
  },
  "error": null
}
```

> 401 Response

```json
{
  "data": null,
  "error": {
    "message": "Token is required"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "Forbidden"
  }
}
```

> 500 Response

```json
{
  "data": null,
  "error": {
    "message": "Internal Server error"
  }
}
```

<h3 id="delete__api_profile_cart-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns success = true if cart was successfully emptied|[EmptySuccessResponse](#schemaemptysuccessresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no token is found or Header x-user-id is missing or no user with such id)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when user isn't admin)|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## post__api_profile_cart_checkout

> Code samples

`POST /api/profile/cart/checkout`

*Create an order*

> Example responses

> 200 Response

```json
{
  "data": {
    "order": {
      "id": "654664c3159ab6e8bb59f912",
      "userId": "654660aed551a02ee536fe4c",
      "cartId": "65466369efd3f9a3ddf5f223",
      "items": [
        {
          "product": {
            "id": "65426846103aa5e276433519",
            "title": "Book",
            "description": "Interesting book",
            "price": 200
          },
          "count": 2
        },
        {
          "product": {
            "id": "65426846103aa5e276433518",
            "title": "Pen",
            "description": "Cute pen",
            "price": 20
          },
          "count": 5
        }
      ],
      "payment": {
        "type": "paypal",
        "address": "London",
        "creditCard": "1234-1234-1234-1234"
      },
      "delivery": {
        "type": "post",
        "address": "London"
      },
      "comments": "",
      "status": "created",
      "total": 500
    }
  },
  "error": null
}
```

> 400 Response

```json
{
  "data": null,
  "error": {
    "message": "Cart is empty"
  }
}
```

> 401 Response

```json
{
  "data": null,
  "error": {
    "message": "Token is required"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "Invalid Token"
  }
}
```

> 500 Response

```json
{
  "data": null,
  "error": {
    "message": "Internal Server error"
  }
}
```

<h3 id="post__api_profile_cart_checkout-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|[CheckoutResponse](#schemacheckoutresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|[CartResponse](#schemacartresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no token is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when token is missed or invalid)|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="shop-api-product">product</h1>

## get__api_products

> Code samples

`GET /api/products`

*Returns a list of products*

> Example responses

> 200 Response

```json
{
  "data": [
    {
      "id": "65426846103aa5e276433519",
      "title": "Book",
      "description": "Interesting book",
      "price": 200
    },
    {
      "id": "a65426846103aa5e276433518",
      "title": "Pen",
      "description": "Cute pen",
      "price": 20
    }
  ],
  "error": null
}
```

> 401 Response

```json
{
  "data": null,
  "error": {
    "message": "Token is required"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "Invalid Token"
  }
}
```

> 500 Response

```json
{
  "data": null,
  "error": {
    "message": "Internal Server error"
  }
}
```

<h3 id="get__api_products-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns a list of all products available|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no token is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when token is missed or invalid)|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<h3 id="get__api_products-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[ProductsResponse](#schemaproductsresponse)]|false|none|none|
|» data|[[Product](#schemaproduct)]|false|none|none|
|»» id|string|false|none|Product id (uuid)|
|»» title|string|false|none|Product name|
|»» description|string|false|none|Product description|
|»» price|number|false|none|Product price|
|» error|[ErrorResponse](#schemaerrorresponse)¦null|false|none|none|
|»» message|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## get__api_products_{productId}

> Code samples

`GET /api/products/{productId}`

*Returns single product*

<h3 id="get__api_products_{productid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|number|true|Id  of product to return|

> Example responses

> 200 Response

```json
{
  "data": {
    "id": "65426846103aa5e276433519",
    "title": "Book",
    "description": "Interesting book",
    "price": 200
  },
  "error": null
}
```

> 401 Response

```json
{
  "data": null,
  "error": {
    "message": "Token is required"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "Invalid Token"
  }
}
```

> 404 Response

```json
{
  "data": null,
  "error": {
    "message": "No product with such id"
  }
}
```

> 500 Response

```json
{
  "data": null,
  "error": {
    "message": "Internal Server error"
  }
}
```

<h3 id="get__api_products_{productid}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|[ProductResponse](#schemaproductresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no token is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when token is missed or invalid)|[CartResponse](#schemacartresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="shop-api-user">user</h1>

## post__login

> Code samples

`POST /login`

*Login user*

> Body parameter

```json
{
  "email": "test2@gmail.com",
  "password": 123456789
}
```

<h3 id="post__login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginUserRequestBody](#schemaloginuserrequestbody)|false|none|

> Example responses

> 200 Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU0NjYwYWVkNTUxYTAyZWU1MzZmZTRjIiwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2OTkxMTE1NTUsImV4cCI6MTY5OTExODc1NX0.2UkbA0U464r2WfKN6RMWvhMzc3wVo71dq6rKvUmoVTs"
}
```

> 400 Response

```json
{
  "data": null,
  "error": {
    "message": "Cart is empty"
  }
}
```

> 401 Response

```json
{
  "data": null,
  "error": {
    "message": "Token is required"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "Invalid Token"
  }
}
```

> 500 Response

```json
{
  "data": null,
  "error": {
    "message": "Internal Server error"
  }
}
```

<h3 id="post__login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User is logined|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|[CartResponse](#schemacartresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no token is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when token is missed or invalid)|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<h3 id="post__login-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» token|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## post__register

> Code samples

`POST /register`

*Register user*

> Body parameter

```json
{
  "email": "test2@gmail.com",
  "password": 123456789,
  "name": "Name",
  "isAdmin": true
}
```

<h3 id="post__register-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RegisterUserRequestBody](#schemaregisteruserrequestbody)|false|none|

> Example responses

> 200 Response

> 400 Response

```json
{
  "data": null,
  "error": {
    "message": "Cart is empty"
  }
}
```

> 401 Response

```json
{
  "data": null,
  "error": {
    "message": "Token is required"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "Invalid Token"
  }
}
```

> 500 Response

```json
{
  "data": null,
  "error": {
    "message": "Internal Server error"
  }
}
```

<h3 id="post__register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User is registered|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|[CartResponse](#schemacartresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no token is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when token is missed or invalid)|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<h3 id="post__register-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Cart">Cart</h2>
<!-- backwards compatibility -->
<a id="schemacart"></a>
<a id="schema_Cart"></a>
<a id="tocScart"></a>
<a id="tocscart"></a>

```json
{
  "id": "654660f1d551a02ee536fe53",
  "items": [
    {
      "product": {
        "id": "65426846103aa5e276433519",
        "title": "Book",
        "description": "Interesting book",
        "price": 200
      },
      "count": 2
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|Cart id|
|items|[[CartItem](#schemacartitem)]|false|none|Items added to cart|

<h2 id="tocS_CartItem">CartItem</h2>
<!-- backwards compatibility -->
<a id="schemacartitem"></a>
<a id="schema_CartItem"></a>
<a id="tocScartitem"></a>
<a id="tocscartitem"></a>

```json
{
  "product": {
    "id": "65426846103aa5e276433519",
    "title": "Book",
    "description": "Interesting book",
    "price": 200
  },
  "count": 2
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product|[Product](#schemaproduct)|false|none|none|
|count|number|false|none|Total count of specific products|

<h2 id="tocS_Product">Product</h2>
<!-- backwards compatibility -->
<a id="schemaproduct"></a>
<a id="schema_Product"></a>
<a id="tocSproduct"></a>
<a id="tocsproduct"></a>

```json
{
  "id": "65426846103aa5e276433519",
  "title": "Book",
  "description": "Interesting book",
  "price": 200
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|Product id (uuid)|
|title|string|false|none|Product name|
|description|string|false|none|Product description|
|price|number|false|none|Product price|

<h2 id="tocS_Order">Order</h2>
<!-- backwards compatibility -->
<a id="schemaorder"></a>
<a id="schema_Order"></a>
<a id="tocSorder"></a>
<a id="tocsorder"></a>

```json
{
  "id": "string",
  "userId": "string",
  "cartId": "string",
  "items": [
    {
      "product": {
        "id": "65426846103aa5e276433519",
        "title": "Book",
        "description": "Interesting book",
        "price": 200
      },
      "count": 2
    }
  ],
  "payment": {
    "type": "string",
    "address": "string",
    "creditCard": "string"
  },
  "delivery": {
    "type": "string",
    "address": "string"
  },
  "comments": "string",
  "status": "string",
  "total": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|userId|string|false|none|none|
|cartId|string|false|none|none|
|items|[[CartItem](#schemacartitem)]|false|none|none|
|payment|object|false|none|none|
|» type|string|false|none|none|
|» address|string|false|none|none|
|» creditCard|string|false|none|none|
|delivery|object|false|none|none|
|» type|string|false|none|none|
|» address|string|false|none|none|
|comments|string|false|none|none|
|status|string|false|none|none|
|total|number|false|none|none|

<h2 id="tocS_CartResponse">CartResponse</h2>
<!-- backwards compatibility -->
<a id="schemacartresponse"></a>
<a id="schema_CartResponse"></a>
<a id="tocScartresponse"></a>
<a id="tocscartresponse"></a>

```json
{
  "data": {
    "cart": {
      "id": "654660f1d551a02ee536fe53",
      "items": [
        {
          "product": {
            "id": "65426846103aa5e276433519",
            "title": "Book",
            "description": "Interesting book",
            "price": 200
          },
          "count": 2
        }
      ]
    },
    "total": 0
  },
  "error": {
    "message": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|object|false|none|none|
|» cart|[Cart](#schemacart)|false|none|none|
|» total|number|false|none|none|
|error|[ErrorResponse](#schemaerrorresponse)|false|none|none|

<h2 id="tocS_CheckoutResponse">CheckoutResponse</h2>
<!-- backwards compatibility -->
<a id="schemacheckoutresponse"></a>
<a id="schema_CheckoutResponse"></a>
<a id="tocScheckoutresponse"></a>
<a id="tocscheckoutresponse"></a>

```json
{
  "data": {
    "order": {
      "id": "string",
      "userId": "string",
      "cartId": "string",
      "items": [
        {
          "product": {
            "id": "65426846103aa5e276433519",
            "title": "Book",
            "description": "Interesting book",
            "price": 200
          },
          "count": 2
        }
      ],
      "payment": {
        "type": "string",
        "address": "string",
        "creditCard": "string"
      },
      "delivery": {
        "type": "string",
        "address": "string"
      },
      "comments": "string",
      "status": "string",
      "total": 0
    }
  },
  "error": {
    "message": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|object|false|none|none|
|» order|[Order](#schemaorder)|false|none|none|
|error|[ErrorResponse](#schemaerrorresponse)|false|none|none|

<h2 id="tocS_ProductResponse">ProductResponse</h2>
<!-- backwards compatibility -->
<a id="schemaproductresponse"></a>
<a id="schema_ProductResponse"></a>
<a id="tocSproductresponse"></a>
<a id="tocsproductresponse"></a>

```json
{
  "data": {
    "id": "65426846103aa5e276433519",
    "title": "Book",
    "description": "Interesting book",
    "price": 200
  },
  "error": {
    "message": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[Product](#schemaproduct)|false|none|none|
|error|[ErrorResponse](#schemaerrorresponse)|false|none|none|

<h2 id="tocS_ProductsResponse">ProductsResponse</h2>
<!-- backwards compatibility -->
<a id="schemaproductsresponse"></a>
<a id="schema_ProductsResponse"></a>
<a id="tocSproductsresponse"></a>
<a id="tocsproductsresponse"></a>

```json
{
  "data": [
    {
      "id": "65426846103aa5e276433519",
      "title": "Book",
      "description": "Interesting book",
      "price": 200
    }
  ],
  "error": {
    "message": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[Product](#schemaproduct)]|false|none|none|
|error|[ErrorResponse](#schemaerrorresponse)|false|none|none|

<h2 id="tocS_UpdateCartRequestBody">UpdateCartRequestBody</h2>
<!-- backwards compatibility -->
<a id="schemaupdatecartrequestbody"></a>
<a id="schema_UpdateCartRequestBody"></a>
<a id="tocSupdatecartrequestbody"></a>
<a id="tocsupdatecartrequestbody"></a>

```json
{
  "productId": "65426846103aa5e276433519",
  "count": 5
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|productId|string|false|none|none|
|count|number|false|none|none|

<h2 id="tocS_UserCredentials">UserCredentials</h2>
<!-- backwards compatibility -->
<a id="schemausercredentials"></a>
<a id="schema_UserCredentials"></a>
<a id="tocSusercredentials"></a>
<a id="tocsusercredentials"></a>

```json
{
  "email": "ann.jones@gmail.com",
  "password": "DDQldls?kdpw0fk"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|

<h2 id="tocS_LoginUserRequestBody">LoginUserRequestBody</h2>
<!-- backwards compatibility -->
<a id="schemaloginuserrequestbody"></a>
<a id="schema_LoginUserRequestBody"></a>
<a id="tocSloginuserrequestbody"></a>
<a id="tocsloginuserrequestbody"></a>

```json
{
  "email": "test2@gmail.com",
  "password": 123456789
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|

<h2 id="tocS_RegisterUserRequestBody">RegisterUserRequestBody</h2>
<!-- backwards compatibility -->
<a id="schemaregisteruserrequestbody"></a>
<a id="schema_RegisterUserRequestBody"></a>
<a id="tocSregisteruserrequestbody"></a>
<a id="tocsregisteruserrequestbody"></a>

```json
{
  "email": "test2@gmail.com",
  "password": 123456789,
  "name": "Name",
  "isAdmin": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|
|name|string|false|none|none|
|isAdmin|boolean|false|none|none|

<h2 id="tocS_EmptySuccessResponse">EmptySuccessResponse</h2>
<!-- backwards compatibility -->
<a id="schemaemptysuccessresponse"></a>
<a id="schema_EmptySuccessResponse"></a>
<a id="tocSemptysuccessresponse"></a>
<a id="tocsemptysuccessresponse"></a>

```json
{
  "data": {
    "success": true
  },
  "error": {
    "message": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|object|false|none|none|
|» success|boolean|false|none|none|
|error|[ErrorResponse](#schemaerrorresponse)|false|none|none|

<h2 id="tocS_ErrorResponse">ErrorResponse</h2>
<!-- backwards compatibility -->
<a id="schemaerrorresponse"></a>
<a id="schema_ErrorResponse"></a>
<a id="tocSerrorresponse"></a>
<a id="tocserrorresponse"></a>

```json
{
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|false|none|none|

