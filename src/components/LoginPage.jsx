import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [touched, setTouched] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const passwordValid = password.trim().length >= 6;

  const canSubmit = emailValid && passwordValid;

  const onSubmit = (e) => {
    e.preventDefault();

    // şimdilik fake login:
    if (!canSubmit) {
      setTouched({ email: true, password: true });
      return;
    }

    // İstersen bunu sonra localStorage ile "loggedIn" yaparız.
    navigate('/');
  };

  return (
    <section className="auth-page" aria-label="Login Page">
      <header className="auth-header">
        <h1>Login</h1>
        <p>Welcome back! Sign in to manage reservations and orders.</p>
      </header>

      <div className="auth-card" role="form" aria-label="Login form">
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, email: true }))}
              aria-invalid={touched.email && !emailValid}
            />
            {touched.email && !emailValid && (
              <p className="field-error">Please enter a valid email address.</p>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input"
              type="password"
              value={password}
              placeholder="Minimum 6 characters"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, password: true }))}
              aria-invalid={touched.password && !passwordValid}
            />
            {touched.password && !passwordValid && (
              <p className="field-error">Password must be at least 6 characters.</p>
            )}
          </div>

          <div className="auth-actions">
            <button className="btn btn-primary" type="submit" disabled={!canSubmit}>
              Sign in
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                setEmail('');
                setPassword('');
                setTouched({ email: false, password: false });
              }}
            >
              Clear
            </button>
          </div>

          <div className="auth-meta">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
            <span className="auth-divider">•</span>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Create account
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;