import InputBtn from "../InputBtn/InputBtn";
import PresentationNLeft from "./PresentationN/PresentationNLeft/PresentationNLeft"
import PresentationNRight from "./PresentationN/PresentationNRight/PresentationNRight";

import "./Accueil.css";
import "./Introduction.css";
import "./Presentation.css";

import femme1 from "./PresentationN/femme1.png";
import femme2 from "./PresentationN/femme2.png";
import femme3 from "./PresentationN/femme3.png";
import arrowLeft from "./arrow-left.png";
import arrowRight from "./arrow-right.png";
import Avis from "./Avis/Avis";

function Accueil() {
  return (
    <div className="Accueil">
      <div className="Introduction">
        <div className="Intro-left">
          <div className="Main-dehors">
          </div>
        </div>
        <div className="Decoration">
          <div className="Arrow"></div>
          <p>Avant de prendre rdv, utilisez notre outils pour estimer le coût de votre entretien ...</p>
        </div>
        <div className="SearchWithImmat">
          <InputBtn
            btnText="ok"
            btnCb={(value) => console.log(value)}
            inputPlaceHolder="CL644BL" />
        </div>
        <div className="Intro-right"></div>
      </div>

      <div className="Presentation">
        <PresentationNLeft
          img={femme1}
          h2={[<span key={Math.floor(Math.random() * 1E5)} className="red">Entretenir</span>, " sa voiture depuis son canapé !"]}
          p="Plus besoin de se déplacer, que vous soyez chez vous ou au bureau, on viens récupérer votre véhicule, faire son entretien pour vous la restituer une fois terminée ..."
        />
        <img src={arrowRight} alt="" style={{
          position: "relative",
          left: "10%"
        }} />

        <PresentationNRight
          img={femme2}
          h2={["Plus aucune surprise, ", <span key={Math.floor(Math.random() * 1E5)} className="red">suivez en direct</span>, " ce qu'on réalise sur votre véhicule..."]}
          p="Suivez à tout moment l’avancement de ce qu’il se passe sur votre véhicule depuis votre compte, vous pourrez visualiser l'état de l'avancement de l'entretien en directe."
        />
        <img src={arrowLeft} alt="" style={{
          position: "relative",
          left: "80%"
        }} />
        <PresentationNLeft
          img={femme3}
          h2={[<span key={Math.floor(Math.random() * 1E5)} className="red">« Zen »,</span>, " on respecte les préconisations constructeurs à la lettre ..."]}
          p="Chaque motorisation d'une véhicule demande un entretien spécifique, cette spécification est fournit par le constructeur et nous vous garantissons que nous la suivons à la lettre !" />
      </div>

      <div className="Avis">
        <Avis />
      </div>
    </div >
  )
}

export default Accueil;