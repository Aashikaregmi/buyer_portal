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
- Search and filter properties by name, location, bedrooms, and price
- Paginated property listings (10 per page)
- Password visibility toggle on login/register forms

## Application Workflow

1. User lands on the home page which displays a scrollable gallery of property images.
2. User clicks "Get Started" to create an account, or "Login" to sign in with existing credentials.
3. On the registration page, user enters their first name, last name, email, and a strong password (minimum 8 characters, at least one number, and one special character). On successful registration, the server returns a JWT token and the user is redirected to the dashboard.
4. On the login page, user enters their email and password. On successful login, the server returns a JWT token and the user is redirected to the dashboard. The token is stored in localStorage for subsequent authenticated requests.
5. The dashboard displays all available property listings in a paginated grid (10 per page). Users can search properties by name or location, filter by location or number of bedrooms, and sort by price (low to high or high to low). Each property card shows the image, title, price, location, and bedroom/bathroom count.
6. Users can click the heart icon on any property card to add it to their favourites. Clicking the heart again removes it. The backend prevents duplicate favourites using a compound unique index on user ID and property ID.
7. The favourites page shows all saved properties with full details (price, location, bedrooms, bathrooms). Users can remove a property from favourites by clicking the delete icon on the card.
8. The navigation bar appears on all pages and shows different links based on authentication state. Logged-in users see Properties, Favourites, their name, and a logout button. Logged-out users see Sign In and Get Started buttons.
9. Logging out clears the token and user data from localStorage and redirects to the login page.

## Entity Relationship Diagram

![Entity Relationship Diagram](erd.png)
