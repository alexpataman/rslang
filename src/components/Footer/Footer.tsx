import { GitHub } from '@mui/icons-material';
import Button from '@mui/material/Button';

import './Footer.scss';

const credentials = ['alexpataman', 'kxzws', 'shpakitze'];

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
      <div className="credentials">
        {credentials.map((el, index) => (
          <Button
            size="small"
            startIcon={<GitHub />}
            href={`https://github.com/${el}`}
            key={index}
          >
            <span className="nickname">{el}</span>
          </Button>
        ))}{' '}
        &copy;&nbsp;2022
      </div>
    </div>
  </footer>
);
