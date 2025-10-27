import React, { lazy } from 'react'
const HomeView = lazy(() => import('@/features/movies/HomeView'))
const SearchView = lazy(() => import('@/features/movies/SearchView'))
const DiscoverView = lazy(() => import('@/features/movies/DiscoverView'))
const DetailsView = lazy(() => import('@/features/movies/DetailsView'))
const LoginView = lazy(() => import('@/features/auth/LoginView'))
const RegisterView = lazy(() => import('@/features/auth/RegisterView'))
const FavoritesView = lazy(() => import('@/features/favorites/FavoritesView'))
export const routes = [
  { path: '/', element: <HomeView /> },
  { path: '/search', element: <SearchView /> },
  { path: '/discover', element: <DiscoverView /> },
  { path: '/movie/:id', element: <DetailsView /> },
  { path: '/login', element: <LoginView /> },
  { path: '/register', element: <RegisterView /> },
  { path: '/favorites', element: <FavoritesView /> },
]
