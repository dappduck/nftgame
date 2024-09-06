import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import {
    MainLayout,
    FullLayout,
} from './layouts'

// pages
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import NFTList from './pages/nftList';
import NotFound from './pages/notFound';

export default function Router() {

    return useRoutes([
        {
            path: '/dashboard',
            element: <MainLayout />,
            children: [
                { path: 'app', element: <Login /> }
            ]
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/home',
            element: <Home />
        },
        {
            path: '/nftlist',
            element: <NFTList />
        },
        {
            path: '/',
            element: <FullLayout />,
            children: [
                { path: '/', element: <Navigate to='/login' /> },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to='/404' /> }
            ]
        },
        { path: '*', element: <Navigate to='/404' replace /> }
    ])
}
