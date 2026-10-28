import { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  function closeMenu() {
    setIsExpanded(false);
  }

  return (
    <header className="studio-header">
      <nav className="navbar navbar-expand-md studio-navbar" aria-label="Main navigation">
        <div className="container">
          <NavLink className="navbar-brand studio-brand" to="/" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">GD</span>
            <span>Studio Orders</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="studioNavigation"
            aria-expanded={isExpanded}
            aria-label="Toggle navigation"
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse${isExpanded ? " show" : ""}`}
            id="studioNavigation"
          >
            <div className="navbar-nav ms-auto">
              <NavLink className="nav-link" to="/" end onClick={closeMenu}>Home</NavLink>
              <NavLink className="nav-link" to="/add" onClick={closeMenu}>Add order</NavLink>
              <NavLink className="nav-link" to="/display" onClick={closeMenu}>All orders</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
