# 3D Art Gallery Backend

## Overview

This is the backend for a 3D Art Gallery web application, built using **Node.js** and **Prisma** ORM with **Express**. The system allows users to interact with various features like user authentication, cart management, and product management for artworks. 

## Features

- **User Authentication**: Users can sign up and log in to the platform.
- **Cart Management**: Users can add products (artworks) to their cart, update quantities, or remove items from their cart.
- **Product Management**: Admin users can manage products (artworks) in the gallery, including adding, updating, deleting, and fetching product details.
- **Artworks & Categories**: Each artwork is associated with a category, stock, price, and image.

## Technologies Used

- **Node.js**: JavaScript runtime used for building the server.
- **Express**: Framework for building REST APIs.
- **Prisma**: ORM to manage database interactions.
- **JWT (JSON Web Tokens)**: Used for user authentication and token-based session management.
- **File Upload (Multer)**: For handling image uploads when adding or updating products.

## API Endpoints

### Authentication

- **POST `/auth/login`**: Log in a user.
- **POST `/auth/signup`**: Sign up a new user.

### Cart Management

- **POST `/cart/add`**: Add a product to the cart.
- **DELETE `/cart/remove`**: Remove a product from the cart.
- **PATCH `/cart/increment`**: Increment the quantity of a product in the cart.
- **PATCH `/cart/decrement`**: Decrement the quantity of a product in the cart.
- **GET `/cart/getCartItems`**: Get all the items in the user's cart.

### Product Management (Admin Only)

- **POST `/product`**: Add a new product to the gallery.
- **PUT `/product/:id`**: Update product details.
- **DELETE `/product/:id`**: Delete a product from the gallery.
- **GET `/product/:id`**: Fetch details of a specific product.
- **GET `/product`**: Get a list of all products in the gallery.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/3d-art-gallery-backend.git
   cd 3d-art-gallery-backend
   
2. Install dependencies:

```bash
   npm install

3. Set up your environment variables:

```DATABASE_URL: Your Prisma database connection URL.
JWT_SECRET: Secret key for JWT token generation.

4. Run database migrations:

```bash
npx prisma migrate dev

5. Start the application:

```bash
npm start

## Folder Structure
```bash
Copy code
├── controllers
│   ├── voter
│   │   ├── addToCart.js        # Cart management logic
│   │   ├── auth.js             # Authentication logic
│   │   └── productController.js # Product management logic
├── middleware
│   ├── verifyToken.js           # Middleware to verify JWT tokens
│   └── validationMiddleware.js  # Validation for product data
├── routes
│   ├── authRoute.js             # Authentication routes
│   ├── addToCartRoute.js        # Cart routes
│   └── productRoute.js          # Product routes
├── config
│   └── database.js              # Prisma database configuration
├── utils
│   └── validators.js            # Input validation utilities
└── package.json                 # Project dependencies and scripts

## Database Schema
 This project uses Prisma for ORM, and it includes models for User, Cart, CartItem, and Product. Below is a brief overview of the database models:

- **User**: Contains user data including authentication details (email, password).
- **Cart**: Stores the cart associated with a user.
- **CartItem**: Represents items in a cart, linking to products.
- **Product**: Represents the artworks in the gallery, including metadata such as price, description, stock, and image URL.

## Authentication
The application uses JWT for authenticating users. To access protected routes, the user must provide a valid token in the request header.

- **Example:**

```bash
Authorization: Bearer <your-jwt-token>

## Error Handling
The backend handles errors with appropriate status codes:

- **400:** Bad request (e.g., missing required fields).
- **401:** Unauthorized (e.g., authentication failure).
- **404:** Not found (e.g., cart or product not found).
- **500:** Internal server error (e.g., database issues).
