
---

## SmartWords Blog Application

Welcome to the official repository of the **SmartWords Blog Application**! This application provides a seamless and user-friendly platform for bloggers to create, edit, and manage their blog posts. Whether you're a seasoned writer or just starting out, SmartWords offers the tools you need to share your thoughts and ideas with the world.

### Overview

SmartWords is a modern blog application built with a focus on simplicity and functionality. It aims to provide an intuitive interface for bloggers to share their thoughts, ideas, and stories with the world.

### Demo

https://github.com/adityaongit/smartwords-blog/assets/74150665/a10bc3c5-38c1-4546-b2ef-1dc1457104ff

### Key Features

- **User Authentication**: Secure user registration and login system.
- **Rich Text Editor**: A powerful editor for creating and formatting blog posts.
- **Responsive Design**: Fully responsive layout that looks great on all devices.
- **Comment System**: Engage with readers through a built-in comment system.
- **Tagging**: Organize posts with tags for better navigation.
- **Search Functionality**: Easily find posts with the integrated search feature.
- **Admin Panel**: Manage posts, comments, and users through an admin interface.

### Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS

## Folder Structure

The repository follows a structured layout for easy navigation and organization:

```
smartwords-blog/
├── client/             
│   ├── public/
│   ├── src/
│   │   ├── components/  
│   │   ├── pages/       
│   │   ├── services/    
│   │   └── ...
├── server/             
│   ├── controllers/    
│   ├── models/         
│   ├── routes/         
│   ├── utils/          
│   └── ...
├── .gitignore            
├── README.md             
├── package.json         
└── ...
```


## Installation

Follow these steps to set up the SmartWords Blog Application on your local machine:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/smartwords-blog.git
   cd smartwords-blog
   ```

2. **Install dependencies:**
   ```sh
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application:**
   ```sh
   # Start backend server
   cd ../server
   npm run dev

   # Start frontend server
   cd ../client
   npm run dev
   ```

   Run the Frontend on `http:localhost:5173/` and Backend on `http:localhost:5000/`.

## API Endpoints

### Authentication
- Sign Up: `POST /api/users/register`
- Login: `POST /api/users/login`

### Pages
- GET all posts: `GET /api/posts`
- GET user post: `GET /api/users/:id`
- GET category posts: `GET /api/posts/categories/:category`
- GET author: `GET /api/users/:id`
- CREATE post: `POST /api/posts`
- UPDATE post: `PATCH /api/post/:id`
- EDIT user: `PATCH /api/users/edit-user`
- DELETE post: `DELETE /api/post/:id`

### Contributing

We welcome contributions to improve the SmartWords Blog Application. If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request.

### Contact

For any questions or inquiries, please contact us at [adysfolio.vercel.app](https://adysfolio.vercel.app).

---

