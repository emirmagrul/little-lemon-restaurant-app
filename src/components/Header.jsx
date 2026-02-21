import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="site-header">
      <img src={logo} alt="Little Lemon logo" />
      <h1 className="logo-text">Little Lemon Restaurant</h1>
    </header>
  );
}

export default Header;
