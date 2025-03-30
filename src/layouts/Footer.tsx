export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="c-footer-text">
        <p className="footer-text-1">&copy; Copyright {currentYear}</p>
        <p className="footer-text-2">
          Hecho con <i className="nes-icon is-small heart"></i> por
          <a
            href="https://github.com/Fernandd0"
            target="_blank"
            className="footer-link"
          >
            Fernando Solorzano
          </a>
        </p>
      </div>
    </footer>
  );
};
