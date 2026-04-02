import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <h2 className="logo">BuyerPortal</h2>
        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link nav-link-primary">Get Started</Link>
        </div>
      </nav>

      <section className="hero">
        <h1>Find Your Dream Property</h1>
        <p>Browse listings, save your favourites, and take the next step toward homeownership.</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">Create Account</Link>
          <Link to="/login" className="btn btn-secondary">Sign In</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Browse Properties</h3>
          <p>Explore a curated selection of homes and apartments in your area.</p>
        </div>
        <div className="feature-card">
          <h3>Save Favourites</h3>
          <p>Heart the properties you love and access them anytime from your dashboard.</p>
        </div>
        <div className="feature-card">
          <h3>Secure & Simple</h3>
          <p>Create an account in seconds and manage everything from one place.</p>
        </div>
      </section>
    </div>
  );
}
