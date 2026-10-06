# LAB 11 - Express REST API

Project theo mạch Lab 9 -> Lab 10 -> Lab 11.

## Cách chạy trên GitHub Codespaces

Repo không còn dùng custom devcontainer để tránh lỗi Recovery Mode.

Tạo một Codespace mới từ branch main, sau đó chỉ cần:

```bash
npm install
npm start
```

Database SQLite local sẽ tự được tạo tại `database/news.db` khi chạy `npm start`.

Mở:
- http://localhost:3000/news
- http://localhost:3000/login
- http://localhost:3000/api/posts

Tài khoản test:
- username: admin
- password: 123456

API Lab 11:
- GET /api/posts
- GET /api/posts/:id
- GET /api/posts/search?keyword=node
- POST /api/posts
- PUT /api/posts/:id
- DELETE /api/posts/:id
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout

POST/PUT/DELETE posts yêu cầu đăng nhập.
