import './Footer.scss';

export const Footer = () => (
  <footer className="Footer">
    <div className="container">
      <div>
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noreferrer"
          className="rs-link"
        >
          RS School
        </a>
      </div>
      <div>
        <a
          href="https://github.com/alexpataman"
          target="_blank"
          rel="noreferrer"
          className="copy-link"
        >
          &copy; 2022
        </a>
      </div>
    </div>
  </footer>
);
