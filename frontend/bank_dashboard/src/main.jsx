import './index.css';
import { Root } from './Root.jsx';
import { Dashboard } from './Dashboard.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Login, user_login } from './Login.jsx';
import { Signup, user_signup } from './Signup.jsx';
import { NotFound } from './NotFound.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/signup',
    Component: Signup,
  },
  {
    path: 'new-signup',
    action: user_signup,
  },
  {
    path: '/user-login',
    action: user_login,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
