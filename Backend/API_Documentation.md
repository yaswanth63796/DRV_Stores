# DRV Stores Backend API Documentation

## Base URL
```
http://localhost:8080
```

## Authentication APIs

### Register User
```
POST /api/users/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string",
  "username": "string", 
  "email": "string",
  "password": "string",
  "role": "CUSTOMER" | "SHOPKEEPER",
  "phone": "string (optional)"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Customer",
  "username": "johncustomer",
  "email": "john@example.com",
  "role": "CUSTOMER",
  "phone": "9876543210",
  "message": "User registered successfully"
}
```

### Login User
```
POST /api/users/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "token": "jwt_token_string",
  "username": "johncustomer",
  "authorities": ["ROLE_CUSTOMER"],
  "message": "Login successful"
}
```

---

## Products APIs

### Get All Products
```
GET /products
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Rice",
    "description": "Premium quality basmati rice",
    "price": 120.50,
    "stock": 100,
    "category": "Grains"
  }
]
```

### Get Product by ID
```
GET /products/{id}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Rice",
  "description": "Premium quality basmati rice",
  "price": 120.50,
  "stock": 100,
  "category": "Grains"
}
```

### Create Product (Requires Authentication)
```
POST /products
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": number,
  "stock": number,
  "category": "string"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Rice",
  "description": "Premium quality basmati rice",
  "price": 120.50,
  "stock": 100,
  "category": "Grains"
}
```

### Update Product (Requires Authentication)
```
PUT /products/{id}
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": number,
  "stock": number,
  "category": "string"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Rice (Updated)",
  "description": "Premium quality basmati rice - 1kg pack",
  "price": 125.00,
  "stock": 150,
  "category": "Grains"
}
```

### Delete Product (Requires Authentication)
```
DELETE /products/{id}
Authorization: Bearer {jwt_token}
```

**Response (200 OK):**
```
Product deleted successfully
```

---

## Orders APIs

### Get All Orders
```
GET /orders
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "userId": 1,
    "items": [
      {
        "productId": 1,
        "name": "Rice",
        "quantity": 2,
        "price": 120.50
      }
    ],
    "totalAmount": 241.00,
    "status": "PENDING",
    "createdAt": "2026-04-17T15:30:00"
  }
]
```

### Get Orders by User ID
```
GET /orders?userId={id}
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "userId": 1,
    "items": [
      {
        "productId": 1,
        "name": "Rice",
        "quantity": 2,
        "price": 120.50
      }
    ],
    "totalAmount": 241.00,
    "status": "PENDING",
    "createdAt": "2026-04-17T15:30:00"
  }
]
```

### Get Order by ID
```
GET /orders/{id}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "name": "Rice",
      "quantity": 2,
      "price": 120.50
    }
  ],
  "totalAmount": 241.00,
  "status": "PENDING",
  "createdAt": "2026-04-17T15:30:00"
}
```

### Create Order
```
POST /orders
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "name": "Rice",
      "quantity": 2,
      "price": 120.50
    },
    {
      "productId": 2,
      "name": "Sugar",
      "quantity": 1,
      "price": 45.00
    }
  ]
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "name": "Rice",
      "quantity": 2,
      "price": 120.50
    },
    {
      "productId": 2,
      "name": "Sugar",
      "quantity": 1,
      "price": 45.00
    }
  ],
  "totalAmount": 286.00,
  "status": "PENDING",
  "createdAt": "2026-04-17T15:30:00"
}
```

### Update Order Status
```
PUT /orders/{id}/status
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "PENDING" | "COMPLETED" | "CANCELLED"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [...],
  "totalAmount": 286.00,
  "status": "COMPLETED",
  "createdAt": "2026-04-17T15:30:00"
}
```

---

## Bills APIs

### Get All Bills
```
GET /bills
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "orderId": null,
    "userId": null,
    "customerName": "Walk-in Customer",
    "items": [
      {
        "productId": 1,
        "name": "Rice",
        "quantity": 3,
        "price": 120.50
      }
    ],
    "totalAmount": 361.50,
    "paymentMethod": "cash",
    "status": "UNPAID",
    "createdAt": "2026-04-17T16:00:00"
  }
]
```

### Get Bill by ID
```
GET /bills/{id}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "orderId": null,
  "userId": null,
  "customerName": "Walk-in Customer",
  "items": [
    {
      "productId": 1,
      "name": "Rice",
      "quantity": 3,
      "price": 120.50
    }
  ],
  "totalAmount": 361.50,
  "paymentMethod": "cash",
  "status": "UNPAID",
  "createdAt": "2026-04-17T16:00:00"
}
```

### Create Bill
```
POST /bills
Content-Type: application/json
```

**Request Body (POS - Walk-in Customer):**
```json
{
  "customerName": "Walk-in Customer",
  "paymentMethod": "cash" | "card" | "upi",
  "items": [
    {
      "productId": 1,
      "name": "Rice",
      "quantity": 3,
      "price": 120.50
    },
    {
      "productId": 2,
      "name": "Sugar",
      "quantity": 2,
      "price": 45.00
    }
  ]
}
```

**Request Body (From Order):**
```json
{
  "orderId": 1,
  "userId": 1,
  "customerName": "John Customer",
  "paymentMethod": "card",
  "items": [
    {
      "productId": 1,
      "name": "Rice",
      "quantity": 2,
      "price": 120.50
    }
  ]
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "orderId": null,
  "userId": null,
  "customerName": "Walk-in Customer",
  "items": [
    {
      "productId": 1,
      "name": "Rice",
      "quantity": 3,
      "price": 120.50
    },
    {
      "productId": 2,
      "name": "Sugar",
      "quantity": 2,
      "price": 45.00
    }
  ],
  "totalAmount": 451.50,
  "paymentMethod": "cash",
  "status": "UNPAID",
  "createdAt": "2026-04-17T16:00:00"
}
```

### Update Bill Status
```
PUT /bills/{id}/status
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "PAID" | "UNPAID"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "orderId": null,
  "userId": null,
  "customerName": "Walk-in Customer",
  "items": [...],
  "totalAmount": 451.50,
  "paymentMethod": "cash",
  "status": "PAID",
  "createdAt": "2026-04-17T16:00:00"
}
```

---

## Error Responses

### Authentication Errors
```json
{
  "error": "Invalid credentials"
}
```

### Validation Errors
```json
{
  "error": "Email already exists"
}
```

### Not Found
```json
{
  "error": "Product not found"
}
```

### Unauthorized
```json
{
  "error": "Access denied"
}
```

---

## Authentication Headers

For protected endpoints, include:
```
Authorization: Bearer {jwt_token}
```

The token is obtained from the login response and must be included in all authenticated requests.
