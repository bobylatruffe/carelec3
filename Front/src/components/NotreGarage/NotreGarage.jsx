import "./NotreGarage.scss";

import notreGarage1 from "./notre-garage-1.png";
import notreGarage2 from "./notre-garage-2.png";
import notreGarage3 from "./notre-garage-3.png";

function NotreGarage() {
  return (
    <div className="notregarage">
      <div className="notregarageN">
        <div className="contentTxt left">
          <h2>Une passion <span className="red">un métier</span></h2>
          <p>Le garage carelec, c’est des d’années d’expérience en mécanique automobile au service de l’entretien de votre véhicule. Depuis, ce sont des centaines de véhicules entretenus par nos soins. L’ensemble de nos réparations sont réalisées sur place, dans notre atelier à Strasbourg.</p>
        </div>
        <img src={notreGarage1} alt="" />
      </div>

      <div className="notregarageN">
        <img src={notreGarage2} alt="" />
        <div className="contentTxt right">
          <h2><span className="red">L’atelier,</span> où tout se passe.</h2>
          <p>Le garage carelec, c’est des d’années d’expérience en mécanique automobile au service de l’entretien de votre véhicule. Depuis, ce sont des centaines de véhicules entretenus par nos soins. L’ensemble de nos réparations sont réalisées sur place, dans notre atelier à Strasbourg.</p>
        </div>
      </div>

      <div className="notregarageN">
        <div className="contentTxt left">
          <h2>L'Alsace,<span className="red"> Strasbourg</span></h2> <p>Afin de garantir au mieux un service de proximité, l’intégralité de l’entretien et de la maintenance est réalisé au sein notre atelier mécanique à Strasbourg. Nous disposons d’une équipe de garagistes au service de la maintenance de votre véhicule. Nous réaliserons au mieux l’entretien de vos véhicules. Mais aussi, l’ensemble des réparations : tâches d’entretien courant, vidange, freinage, pneumatique, entretien des filtres, ou encore la carrosserie et la peinture avec notre service dédié.</p>

        </div>
        <img src={notreGarage3} alt="" />
      </div>
    </div>
  )
}

export default NotreGarage;