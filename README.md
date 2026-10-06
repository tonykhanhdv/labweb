# LAB 11 - Express REST API

Project được dựng theo mạch Lab 9 -> Lab 10 -> Lab 11.

## Chạy trên GitHub Codespaces

Nếu Codespace được tạo trước khi repo có thư mục .devcontainer, hãy chạy một lần:
Ctrl + Shift + P -> Codespaces: Rebuild Container

Sau đó chỉ cần:

npm install
npm start

Mở:
- http://localhost:3000/news
- http://localhost:3000/login
- http://localhost:3000/api/posts

Tài khoản test:
- admin
- 123456

API:
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
