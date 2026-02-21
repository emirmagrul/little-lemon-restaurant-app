import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer role="contentinfo">
      <img src={logo} alt="Little Lemon logo" />
      <nav aria-label="Footer navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/booking">Reservations</Link></li>
          <li><Link to="/order-online">Order Online</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <p>&copy; {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
