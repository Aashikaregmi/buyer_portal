# Buyer Portal

A full-stack real estate buyer portal where users can browse property listings, create accounts, and save their favourite properties. Built with FastAPI, MongoDB, React, and TypeScript.

## Tech Stack

**Backend:** FastAPI, MongoDB (Motor async driver), JWT authentication, Bcrypt password hashing, Pydantic  
**Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS 4, Framer Motion, Axios, React Router 7, Radix UI, Lucide Icons

## Features

- User registration with strong password validation (min 8 chars, at least 1 number, 1 special character)
- JWT-based authentication with 60-minute token expiry
- Browse 30+ property listings with images, prices, and details
- Add/remove properties from favourites (per-user, with duplicate prevention)
- Responsive design with animated UI components
- Toast notifications for user feedback
- Protected routes with automatic redirect to login

