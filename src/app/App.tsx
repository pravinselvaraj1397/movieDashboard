import React from 'react'
import { Link, Outlet, useRoutes } from 'react-router-dom'
import { routes } from './router'
import { AuthProvider, useAuth } from '@/features/auth/AuthContext'
import { FavoritesProvider } from '@/features/favorites/FavoritesContext'
import { toggleTheme, getTheme, setTheme } from '@/styles/Theme'
import { useTranslation } from 'react-i18next'

function Loader() { return <div className="py-10 text-center text-muted">Loading…</div> }
const Shell = () => (<React.Suspense fallback={<Loader />}>{useRoutes(routes)}</React.Suspense>)

function Nav() {
  const { user, logout } = useAuth()
  const { t, i18n } = useTranslation()
  React.useEffect(() => { setTheme(getTheme()) }, [])
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-zinc-900/60 border-b border-zinc-800">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <Link to="/" className="font-extrabold tracking-tight flex items-center gap-2">🎬 {t('brand')}</Link>
        <nav className="flex items-center gap-2 flex-wrap">
          <Link to="/search" className="btn btn-ghost">{t('search')}</Link>
          <Link to="/discover" className="btn btn-ghost">Discover</Link>
          <Link to="/favorites" className="btn btn-ghost">{t('favorites')}</Link>
          <button className="btn btn-ghost" onClick={toggleTheme}>🌓</button>
          <button className="btn btn-ghost" onClick={()=> i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en')}>{i18n.language.toUpperCase()}</button>
          {user ? (
            <>
              <span className="text-sm text-muted">Hi, {user.name || user.email}</span>
              <button className="btn btn-ghost" onClick={logout}>{t('logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">{t('login')}</Link>
              <Link to="/register" className="btn btn-ghost">{t('register')}</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Nav />
        <main className="max-w-[1200px] mx-auto px-4 py-4">
          <Shell />
          <Outlet />
        </main>
        <footer className="text-center text-sm text-muted py-10">Built with React + TypeScript + Tailwind + Vite</footer>
      </FavoritesProvider>
    </AuthProvider>
  )
}
