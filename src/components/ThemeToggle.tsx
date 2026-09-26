import { useTheme } from '../theme/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm0 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.5-2.5a1 1 0 1 1 0-2H21a1 1 0 1 1 0 2h-1.5ZM3 12a1 1 0 0 1 1-1h1.5a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm13.95-6.36a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 1 1-1.41 1.41L16.95 7.05a1 1 0 0 1 0-1.41ZM4.58 17.3a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 0 1-1.41 1.41L4.58 18.7a1 1 0 0 1 0-1.41Zm12.73 0a1 1 0 0 1 1.41 1.41l-1.06 1.06a1 1 0 1 1-1.41-1.41l1.06-1.06ZM7.05 5.64a1 1 0 0 1 0 1.41L5.99 8.11A1 1 0 1 1 4.58 6.7l1.06-1.06a1 1 0 0 1 1.41 0ZM12 17a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V18a1 1 0 0 1 1-1Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M14.5 3.5a8.5 8.5 0 1 0 6 11.8A7 7 0 0 1 14.5 3.5Z"
          />
        </svg>
      )}
    </button>
  )
}
