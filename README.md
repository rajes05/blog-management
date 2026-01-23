# Blog Management API

## Prerequisites

- Node.js version 18 or higher
- MongoDB database

## Installation

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

- `PORT`: Port number for the server (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET_KEY`: Secret key for JWT token generation

Example `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-management
JWT_SECRET_KEY=your-secret-key-here
```

## Running the Application

- Development mode: `npm run dev`
- Production mode: `npm start`

## Overview

This API provides endpoints for managing blog posts in a blog application. It allows authenticated users to create, read, update, and delete blog posts. The API is built using Node.js, Express.js, and MongoDB with Mongoose.

## Authentication

All endpoints require authentication via JWT token. The token must be included in the `Authorization` header as `Bearer <token>`. Authentication is handled by the `authenticateToken` middleware.

## Base URL

Assuming the server runs on `http://localhost:3000`, the base URL for blog routes is `http://localhost:3000/api/blogs` (adjust based on your server configuration).

## Endpoints

### 1. Create Blog

- **Method:** `POST`
- **Path:** `/create-blog`
- **Description:** Creates a new blog post for the authenticated user.
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "category": "string"  // Optional, defaults to 'Other'
  }
  ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "message": "New Blog created successfully!",
      "newBlog": {
        "_id": "blogId",
        "title": "Blog Title",
        "content": "Blog Content",
        "auther": {
          "_id": "userId",
          "fullName": "Author Name",
          "email": "author@example.com"
        },
        "category": "Other",
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "message": "Title and Content are required!"
    }
    ```

### 2. Get All Blogs

- **Method:** `GET`
- **Path:** `/get-all-blogs`
- **Description:** Retrieves all blog posts, sorted by creation date (newest first).
- **Authentication:** Required
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "Got all blogs successfully!",
      "count": 5,
      "allBlogs": [
        {
          "_id": "blogId1",
          "title": "Blog Title 1",
          "content": "Blog Content 1",
          "auther": {
            "_id": "userId1",
            "fullName": "Author Name 1",
            "email": "author1@example.com"
          },
          "category": "Technology",
          "createdAt": "2023-10-01T00:00:00.000Z",
          "updatedAt": "2023-10-01T00:00:00.000Z"
        },
        // ... more blogs
      ]
    }
    ```

### 3. Get Author's Blogs

- **Method:** `GET`
- **Path:** `/get-auther-blogs`
- **Description:** Retrieves all blog posts created by the authenticated user.
- **Authentication:** Required
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "Successfully got author blogs!",
      "count": 3,
      "autherBlogs": [
        {
          "_id": "blogId1",
          "title": "Blog Title 1",
          "content": "Blog Content 1",
          "auther": {
            "_id": "userId",
            "fullName": "Author Name",
            "email": "author@example.com"
          },
          "category": "Technology",
          "createdAt": "2023-10-01T00:00:00.000Z",
          "updatedAt": "2023-10-01T00:00:00.000Z"
        },
        // ... more blogs
      ]
    }
    ```

### 4. Update Blog

- **Method:** `PUT`
- **Path:** `/update-blog/:blogId`
- **Description:** Updates an existing blog post owned by the authenticated user.
- **Authentication:** Required
- **Parameters:**
  - `blogId` (URL parameter): The ID of the blog to update.
- **Request Body:**
  ```json
  {
    "title": "string",    // Optional
    "content": "string",  // Optional
    "category": "string"  // Optional
  }
  ```
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "Blog updated successfully!",
      "blog": {
        "_id": "blogId",
        "title": "Updated Blog Title",
        "content": "Updated Blog Content",
        "auther": {
          "_id": "userId",
          "fullName": "Author Name",
          "email": "author@example.com"
        },
        "category": "Health",
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-02T00:00:00.000Z"
      }
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "message": "Blog not found or you are not authorized!"
    }
    ```

### 5. Delete Blog

- **Method:** `DELETE`
- **Path:** `/delete-blog/:blogId`
- **Description:** Deletes a blog post owned by the authenticated user.
- **Authentication:** Required
- **Parameters:**
  - `blogId` (URL parameter): The ID of the blog to delete.
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "Blog deleted successfully!",
      "blog": {
        "_id": "blogId",
        "title": "Deleted Blog Title",
        "content": "Deleted Blog Content",
        "auther": {
          "_id": "userId",
          "fullName": "Author Name",
          "email": "author@example.com"
        },
        "category": "Other",
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
      }
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "message": "Blog not found or you are not authorized!"
    }
    ```

## Data Models

### Blog Model

The Blog model represents a blog post in the database.

- **Fields:**
  - `title`: String (required, trimmed)
  - `content`: String (required)
  - `auther`: ObjectId (reference to User model, required)
  - `category`: String (enum: 'Technology', 'Health', 'Travel', 'Food', 'Lifestyle', 'Other'; default: 'Other')
  - `createdAt`: Date (automatically set)
  - `updatedAt`: Date (automatically set)

### User Model (Referenced)

The Blog model references the User model for the author.

- **Relevant Fields:**
  - `_id`: ObjectId
  - `fullName`: String
  - `email`: String

## Error Handling

The API uses an error handler middleware to catch and respond to errors. Common error responses include:

- **400 Bad Request:** Invalid request data.
- **401 Unauthorized:** Missing or invalid authentication token.
- **404 Not Found:** Resource not found or user not authorized.
- **500 Internal Server Error:** Server-side errors.

## Notes

- All blog operations are restricted to the authenticated user (author).
- Blogs are populated with author details (fullName and email) in responses.
- The API uses async handlers for error management.
- Categories are predefined; invalid categories default to 'Other'.
