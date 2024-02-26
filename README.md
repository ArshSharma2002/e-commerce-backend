# E-Commerce Backend API with Node.js

---

## POSTMAN API's:
 **Link to POSTMAN WORKSPACE FOR API's:**

     https://www.postman.com/descent-module-engineer-97921318/workspace/my-workspace/documentation/16345450-0e336dfc-37b0-4d84-9115-05be74e3c60a

## Description:

This project implements a RESTful API for an online shopping platform. It allows users to register, login, view products, add products to cart, place orders, and manage their orders.

---

## Installation:

1. **Clone the repository:**
     ```bash
     git clone https://github.com/ArshSharma2002/e-commerce-backend.git
     ```

2. **Navigate to the project directory:**
     ```bash
     cd backend
     ```

3. **Install dev dependencies:**
     ```bash
     npm install
     ```

4. **Set up environment variables:**
     - Create a `.env` file in the root directory.
     - Define the following environment variables:
          ```plaintext
          PORT=5000
          DB_URI=<mongodb_connection_string>
          
          ACESS_TOKEN_SECRET=<accesstoken_secret_key>
          ACESS_TOKEN_EXPIRY=<access_token_expiry_time>
          REFRESH_TOKEN_SECRET=<refresh_token_secret_key>
          REFRESH_TOKEN_EXPIRY=<refresh_token_expiry_time>

          ```

5. **Start the server:**
     ```bash
     npm run dev
     ```

---
