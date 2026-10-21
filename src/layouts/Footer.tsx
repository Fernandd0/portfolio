export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <div className="c_container c-footer-text">
        <p className="footer-text-1">&copy; {currentYear} Fernando Solorzano</p>
        <p className="footer-text-2">
          Handcrafted{' '}
          <a
            href="https://github.com/Fernandd0"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            pixel by pixel
          </a>
        </p>
      </div>
    </footer>
  )
}
