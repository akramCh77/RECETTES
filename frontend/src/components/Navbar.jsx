// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container">
//         <Link className="navbar-brand" to="/">
//           Recettes
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Accueil
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/ajouter">
//                 Ajouter une recette
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-dark bg-dark">
//       <div className="container">
//         <Link className="navbar-brand" to="/">
//           Recette Algérienne 🇩🇿
//         </Link>
//         <Link to="/ajouter" className="btn btn-primary">
//           Ajouter une Recette
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT50-4SZzpb-AkaQtGt-g51rn7iMFZxgeCBGg&s" // URL de l'image
            alt="Drapeau de l'Algérie"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {' '}
          Recette Algérienne
        {/* </Link>
        <Link to="/ajouter" className="btn btn-primary">
          Ajouter une Recette */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;