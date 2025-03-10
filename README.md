# Authentication API Documentation

## Endpoints

### POST /api/auth/login

**Description:**
Logs in a user with their email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Responses:**

- **200 OK**
  ```json
  {
    "message": "Login Successful",
    "user": {
      "_id": "userId",
      "email": "user@example.com",
      "fullname": "User Fullname",
      "profilePic": "profilePicUrl",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

- **400 Bad Request**
  ```json
  {
    "message": "Invalid Credentials"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Error message"
  }
  ```

### POST /api/auth/logout

**Description:**
Logs out the currently authenticated user.

**Responses:**

- **200 OK**
  ```json
  {
    "message": "Logout Successful"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Error message"
  }
  ```

## Message Endpoints

### GET /api/message/users

**Description:**
Get all users for the sidebar (excluding the currently logged-in user).

**Headers:**
```
Cookie: jwt=<token>
```

**Responses:**

- **200 OK**
  ```json
  [
    {
      "_id": "userId1",
      "name": "John Doe",
      "profilePic": "profile-url-1"
    },
    {
      "_id": "userId2",
      "name": "Jane Smith",
      "profilePic": "profile-url-2"
    }
  ]
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "Not Authorized, No Token"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Server Error"
  }
  ```

### GET /api/message/:id

**Description:**
Get chat messages between the logged-in user and specified user.

**Parameters:**
- `id`: ID of the user to get chat history with

**Headers:**
```
Cookie: jwt=<token>
```

**Responses:**

- **200 OK**
  ```json
  [
    {
      "_id": "messageId1",
      "senderId": "userId1",
      "receiverId": "userId2",
      "text": "Hello!",
      "image": null,
      "createdAt": "2024-01-20T10:00:00.000Z",
      "updatedAt": "2024-01-20T10:00:00.000Z"
    },
    {
      "_id": "messageId2",
      "senderId": "userId2",
      "receiverId": "userId1",
      "text": "Hi there!",
      "image": "image-url",
      "createdAt": "2024-01-20T10:01:00.000Z",
      "updatedAt": "2024-01-20T10:01:00.000Z"
    }
  ]
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "Not Authorized, No Token"
  }
  ```

### POST /api/message/send/:id

**Description:**
Send a message to a specific user.

**Parameters:**
- `id`: ID of the recipient user

**Headers:**
```
Cookie: jwt=<token>
```

**Request Body:**
```json
{
  "text": "Hello, how are you?",
  "image": "base64EncodedImage" // optional
}
```

**Responses:**

- **200 OK**
  ```json
  {
    "_id": "newMessageId",
    "senderId": "senderId",
    "receiverId": "receiverId",
    "text": "Hello, how are you?",
    "image": "cloudinary-image-url",
    "createdAt": "2024-01-20T10:05:00.000Z",
    "updatedAt": "2024-01-20T10:05:00.000Z"
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "Not Authorized, No Token"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Server Error"
  }
  ```