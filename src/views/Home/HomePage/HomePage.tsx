import { HomeAbout } from '../HomeAbout/HomeAbout';
import { HomeFeatures } from '../HomeFeatures/HomeFeatures';
import { HomeWelcome } from '../HomeWelcome/HomeWelcome';
import './HomePage.scss';

export const HomePage = () => (
  <div className="HomePage">
    <HomeWelcome />
    <HomeFeatures />
    <HomeAbout />
  </div>
);
