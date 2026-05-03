# Comprehensive Project Analysis: DRV Stores

## 1. Project Overview
DRV Stores is a full-stack e-commerce and point-of-sale (POS) web application designed for a provision/grocery store. It handles both online customer orders and walk-in customer manual billing. The application features role-based access for Customers and Shopkeepers, secure JWT-based authentication, a robust backend REST API, and an integrated billing system with bilingual support (Tamil/English).

## 2. Technology Stack

### Frontend
- **Framework:** React 19 built with Vite
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **UI & Styling:** Vanilla CSS, Swiper (for interactive sliders/carousels)
- **Tooling:** ESLint, npm

### Backend
- **Framework:** Java 17, Spring Boot 4.0.5
- **Security:** Spring Security with JWT (JSON Web Tokens)
- **Database ORM:** Spring Data JPA
- **Database:** PostgreSQL
- **Payment Gateway:** Razorpay Java SDK integration
- **Build Tool:** Maven

---

## 3. Frontend Architecture & Features
Located in the `frontend/` directory, the frontend is organized into standard React architectural layers (`pages`, `components`, `services`, `context`, `utils`).

### Key Features & Capabilities:
- **Authentication System:** Secure login and registration flows with token-based session management.
- **Customer Portal:**
  - Product browsing and catalog viewing (`HomePage`, `ProductListPage`).
  - Shopping cart management (`CartPage`).
  - Online order placement and history tracking (`OrderHistoryPage`, `CustomerDashboard`).
- **Shopkeeper / Admin Dashboard:**
  - Complete inventory management to add, update, and remove products (`AddProductPage`).
  - Online order fulfillment and status tracking (`OrdersPage`).
- **Advanced POS Billing System:**
  - Manual Bill Generation (`CreateBillPage`) for walk-in customers.
  - Automatic price calculations and real-time total updates.
  - Seamless conversion of online orders into printable bills.
  - Bilingual interface (Tamil & English) for local accessibility.

---

## 4. Backend Architecture & Contents
Located in the `Backend/` directory, the backend follows a monolithic Spring Boot architecture using the MVC (Model-View-Controller) design pattern.

### Database Entities & Data Models:
- **User:** Manages accounts with roles (`CUSTOMER`, `SHOPKEEPER`).
- **Product:** Stores inventory item details (price, stock, category, description).
- **Order & OrderItem:** Tracks online purchases. Tracks state via `OrderStatus` enum (PENDING, COMPLETED, CANCELLED).
- **Bill & BillItem:** Represents the final financial transaction for both walk-in customers and online orders. Tracks `PaymentStatus` and `BillStatus`.

### Core Backend Modules:
- **Controllers:** Expose RESTful endpoints.
- **Services:** Contain core business logic (e.g., calculating totals, managing stock).
- **Repositories:** Interfaces extending `JpaRepository` for PostgreSQL database queries.
- **Security/Filters:** Custom JWT authentication filters intercepting requests to validate tokens before accessing protected resources.

---

## 5. API Endpoints Documentation
**Base URL:** `http://localhost:8080`

### Authentication APIs (`AuthController`)
- `POST /api/users/register`: Register a new user. Expects `name`, `username`, `email`, `password`, and `role` (`CUSTOMER` | `SHOPKEEPER`).
- `POST /api/users/login`: Authenticate and return a JWT token along with user authorities.

### Products APIs (`ProductController`)
- `GET /products`: Fetch the complete list of available products.
- `GET /products/{id}`: Fetch detailed information for a specific product.
- `POST /products`: Create a new product in the inventory. *(Protected)*
- `PUT /products/{id}`: Update an existing product's details or stock. *(Protected)*
- `DELETE /products/{id}`: Remove a product from the inventory. *(Protected)*

### Orders APIs (`OrderController`)
- `GET /orders`: Retrieve all placed online orders.
- `GET /orders?userId={id}`: Retrieve order history for a specific customer.
- `GET /orders/{id}`: Retrieve full details of a specific order, including nested items.
- `POST /orders`: Submit a new online order containing multiple order items.
- `PUT /orders/{id}/status`: Update the fulfillment status of an order.

### Bills APIs (`BillController`)
- `GET /bills`: Retrieve a list of all generated bills.
- `GET /bills/{id}`: Retrieve a specific bill.
- `POST /bills`: Generate a new bill. This endpoint accepts data for direct walk-in customers (manual POS entry) or can map an existing `orderId` to a final bill.
- `PUT /bills/{id}/status`: Update the payment status of a bill (e.g., from `UNPAID` to `PAID`).

*(Note: Protected endpoints require an `Authorization: Bearer {jwt_token}` header.)*
