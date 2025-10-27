export type Theme = 'dark' | 'light'
const KEY = 'app:theme'
export function getTheme(): Theme { return (localStorage.getItem(KEY) as Theme) || 'dark' }
export function setTheme(t: Theme) {
  localStorage.setItem(KEY, t)
  const html = document.documentElement; html.classList.remove('dark','light'); html.classList.add(t)
}
export function toggleTheme() { setTheme(getTheme() === 'dark' ? 'light' : 'dark') }
