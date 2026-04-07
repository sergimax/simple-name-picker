import './styles.css'

export function AppFooter() {
  return (
    <footer className="app-footer">
      <p className="app-footer-credit">
        version{" "}
        <span className="app-footer-version">{__APP_VERSION__}</span>{" "}
        by{" "}
        <a
          href="https://github.com/sergimax"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="sergimax на GitHub"
        >
          sergimax
        </a>{" "}
        via{" "}
        <a
          href="https://cursor.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cursor"
        >
          Cursor
        </a>
      </p>
    </footer>
  )
}
