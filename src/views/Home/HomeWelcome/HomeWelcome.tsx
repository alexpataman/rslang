import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import homeImg from '../../../assets/img/home.webp';
import './HomeWelcome.scss';

export const HomeWelcome = () => (
  <div className="container">
    <section className="HomeWelcome">
      <div className="welcome">
        <Typography variant="h1">Что такое RSLang?</Typography>
        <Typography>Это приложение для изучения английских слов!</Typography>
        <Typography>
          Оно включает в себя электронный учебник с базой слов для изучения,
          мини-игры для их повторения, страницу статистики для отслеживания
          индивидуального прогресса.
        </Typography>
        <Button
          variant="contained"
          size="large"
          to="/textbook"
          component={Link}
        >
          Начать изучение
        </Button>
      </div>
      <div className="image">
        <img src={homeImg} alt="home" />
      </div>
    </section>
  </div>
);
