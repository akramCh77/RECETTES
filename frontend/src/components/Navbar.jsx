import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faTimes,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <Link to="/" className="brand-link">
          <div className="brand-container">
            <div className="logo-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT50-4SZzpb-AkaQtGt-g51rn7iMFZxgeCBGg&s"
                alt="Drapeau de l'Algérie"
                className="logo-img"
              />
            </div>
            <h1 className="brand-title">Recette <span>Algérienne</span></h1>
          </div>
        </Link>
        
        {/* Suppression des liens de navigation */}
        <div className="nav-links">
          {/* Liens supprimés */}
        </div>
        
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} />
        </button>
      </div>
      
      <div className={`mobile-menu ${showMobileMenu ? 'show' : ''}`}>
        <div className="mobile-nav-links">
          {/* Liens supprimés également dans le menu mobile */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;