


# 📚 Library Management API
``

## 📌 API Endpoints

### Books

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | /api/books       | Get all books       |
| GET    | /api/books/:id   | Get book by ID      |
| POST   | /api/books       | Create a new book   |
| PATCH  | /api/books/:id   | Update a book       |
| DELETE | /api/books/:id   | Delete a book       |

### Borrow

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| POST   | /api/borrow            | Borrow a book          |
| GET    | /api/borrow/summary    | Borrow summary (agg)   |




# 🧪 Create .env File
``
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library``


# 📦 Install Dependencies
``
npm install``

# ▶️ Start the Server 
` npm run dev ` 