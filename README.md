# Talksy - Real-time Chat Application

Talksy is a modern real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO for real-time communication. The app features a clean UI with theme customization, user authentication, real-time messaging, image sharing, and online/offline user status.

## Features

- User authentication with JWT
- Real-time messaging with Socket.IO
- Multiple theme options
- Image sharing support
- User profile customization
- Online/Offline user status
- Modern UI with Tailwind CSS and DaisyUI
- Responsive design

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- DaisyUI
- Socket.IO Client
- Zustand (State Management)
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- Socket.IO
- JWT Authentication
- Cloudinary (Image Storage)
- Bcrypt.js

## Environment Variables

Before running this project, you will need to add the following environment variables to your .env file in the backend directory:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Run Locally

Clone the project

```bash
git clone https://github.com/yourusername/talksy.git
cd talksy
```

Install backend dependencies

```bash
cd backend
npm install
```

Install frontend dependencies

```bash
cd frontend
npm install
```

Start the backend server

```bash
cd backend
npm run dev
```

Start the frontend development server

```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

## Project Structure

```
chat-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── lib/
│   ├── public/
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── lib/
    └── package.json
```

## Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


## Acknowledgements

- [Socket.IO](https://socket.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Cloudinary](https://cloudinary.com/)
- [storyset](https://storyset.com/people)
