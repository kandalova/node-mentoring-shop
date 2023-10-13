---
title: API v1.0.0
language_tabs:
  - http: http
  - HTTP: HTTP
language_clients:
  - http: ""
  - HTTP: ""
toc_footers: []
includes: []
search: false
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="api">null v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="api-cart">cart</h1>

## get__api_profile_cart

> Code samples

```http
GET /api/profile/cart HTTP/1.1

Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

```http
GET /api/profile/cart HTTP/1.1

Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

`GET /api/profile/cart`

*Get user cart or create if it is missing*

<h3 id="get__api_profile_cart-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-user-id|header|string(uuid)|true|User id (uuid)|

> Example responses

> 200 Response

```json
{
  "data": {
    "cart": {
      "id": "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
      "items": [
        {
          "product": {
            "id": "891389f0-4312-42d6-a650-6fda0959c734",
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
    "message": "User is not authorized"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "You must be authorized user"
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
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no user matching authorization header is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when authorization header is missing)|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## put__api_profile_cart

> Code samples

```http
PUT /api/profile/cart HTTP/1.1

Content-Type: application/json
Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

```http
PUT /api/profile/cart HTTP/1.1

Content-Type: application/json
Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

`PUT /api/profile/cart`

*Update user cart*

> Body parameter

```json
{
  "productId": "915b2f40-9fd9-47f2-9b51-628f3dc69aac",
  "count": 5
}
```

<h3 id="put__api_profile_cart-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-user-id|header|string(uuid)|true|User id (uuid)|
|body|body|[UpdateCartRequestBody](#schemaupdatecartrequestbody)|false|none|

> Example responses

> 200 Response

```json
{
  "data": {
    "cart": {
      "id": "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
      "items": [
        {
          "product": {
            "id": "891389f0-4312-42d6-a650-6fda0959c734",
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
    "message": "User is not authorized"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "You must be authorized user"
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Cart can be updated in the following ways - 1) products can be added 2) products can be dropped 3) amount of product might have changed. Request body to be provided contains a snapshot of cart after changes.|[CartResponse](#schemacartresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|[CartResponse](#schemacartresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no user matching authorization header is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when authorization header is missing)|[CartResponse](#schemacartresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## delete__api_profile_cart

> Code samples

```http
DELETE /api/profile/cart HTTP/1.1

Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

```http
DELETE /api/profile/cart HTTP/1.1

Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

`DELETE /api/profile/cart`

*Empty user cart*

<h3 id="delete__api_profile_cart-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-user-id|header|string(uuid)|true|User id (uuid)|

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
    "message": "User is not authorized"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "You must be authorized user"
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
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no user matching authorization header is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when authorization header is missing)|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## post__api_profile_cart_checkout

> Code samples

```http
POST /api/profile/cart/checkout HTTP/1.1

Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

```http
POST /api/profile/cart/checkout HTTP/1.1

Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

`POST /api/profile/cart/checkout`

*Create an order*

<h3 id="post__api_profile_cart_checkout-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-user-id|header|string(uuid)|true|User id (uuid)|

> Example responses

> 200 Response

```json
{
  "data": {
    "order": {
      "id": "6c36d6fa-f694-4f9c-9b2c-6f7049d38f4a",
      "userId": "6dc52b3c-de7e-431a-84b8-0ec56e0774d4",
      "cartId": "cadff0c5-0079-4db8-b6bf-84c9c2633ca3",
      "items": [
        {
          "product": {
            "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
            "title": "Book",
            "description": "Interesting book",
            "price": 200
          },
          "count": 2
        },
        {
          "product": {
            "id": "afdd68c4-d359-45e6-b9fd-c8fdb2a162a0",
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
    "message": "User is not authorized"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "You must be authorized user"
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
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no user matching authorization header is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when authorization header is missing)|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="api-product">product</h1>

## get__api_products

> Code samples

```http
GET /api/products HTTP/1.1

Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

```http
GET /api/products HTTP/1.1

Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

`GET /api/products`

*Returns a list of products*

<h3 id="get__api_products-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-user-id|header|string(uuid)|true|User id (uuid)|

> Example responses

> 200 Response

```json
{
  "data": [
    {
      "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
      "title": "Book",
      "description": "Interesting book",
      "price": 200
    },
    {
      "id": "afdd68c4-d359-45e6-b9fd-c8fdb2a162a0",
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
    "message": "User is not authorized"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "You must be authorized user"
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
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no user matching authorization header is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when authorization header is missing)|[CartResponse](#schemacartresponse)|
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

<aside class="success">
This operation does not require authentication
</aside>

## get__api_products_{productId}

> Code samples

```http
GET /api/products/{productId} HTTP/1.1

Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

```http
GET /api/products/{productId} HTTP/1.1

Accept: application/json
x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

```

`GET /api/products/{productId}`

*Returns single product*

<h3 id="get__api_products_{productid}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|productId|path|number|true|Id (uuid) of product to return|
|x-user-id|header|string(uuid)|true|User id (uuid)|

> Example responses

> 200 Response

```json
{
  "data": {
    "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
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
    "message": "User is not authorized"
  }
}
```

> 403 Response

```json
{
  "data": null,
  "error": {
    "message": "You must be authorized user"
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
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized (when no user matching authorization header is found)|[CartResponse](#schemacartresponse)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden (when authorization header is missing)|[CartResponse](#schemacartresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|[CartResponse](#schemacartresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal server error|[CartResponse](#schemacartresponse)|

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
  "id": "dd5ec5ab-deaa-419c-8a6b-7e67b1f7ec87",
  "items": [
    {
      "product": {
        "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
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
|id|string|false|none|Cart id (uuid)|
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
    "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
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
  "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
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
        "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
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
      "id": "dd5ec5ab-deaa-419c-8a6b-7e67b1f7ec87",
      "items": [
        {
          "product": {
            "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
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
            "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
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
    "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
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
      "id": "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
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
  "productId": "915b2f40-9fd9-47f2-9b51-628f3dc69aac",
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

