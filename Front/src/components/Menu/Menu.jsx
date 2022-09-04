import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav>
      <Link to="/accueil">Accueil</Link>
      <Link to="/notregarage">Notre garage</Link>
      <Link to="/commentcamarche">Comment ça marche</Link>
      <Link to="/aides">Aides</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/moncompte">Mon compte</Link>
    </nav>
  )
}