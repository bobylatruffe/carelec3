import { fetchAvis } from "../../../utilitaires/serveurApi";

import "./Avis.css";

import simpleArrowLeft from "./simpleArrowLeft.png";
import simpleArrowRight from "./simpleArrowRight.png";
import quoteRougeLeft from "./quoteRougeLeft.png";
import quoteRougeRight from "./quoteRougeRight.png";

import { useState, useEffect } from "react";

function Avis() {
  const [avis, setAvis] = useState([]);
  const [currentAvis, setCurrentAvis] = useState("Lorem ipsum dolor sit, amet consectetur adipisicing elit.Cum tempora beatae, numquam quae vitae ea natus neque omnis enim eos eum sunt, officiis dignissimos corporis soluta aliquam aperiam voluptas rerum.");

  useEffect(() => {
    fetchAvis()
      .then(avis => {
        if (avis.length > 0) {
          setAvis(avis);
          setCurrentAvis(avis[Math.floor(Math.random() * avis.length)]);
        }
      })
      .catch(err => console.log(err.message))
  }, []);

  const previousAvis = () => {
    if (avis.length > 0) {
      const i = avis.indexOf(currentAvis)
      if (i === 0) {
        setCurrentAvis(avis[avis.length - 1]);
        return;
      }

      setCurrentAvis(avis[i - 1]);
    }
  }

  const nextAvis = () => {
    if (avis.length > 0) {
      const i = avis.indexOf(currentAvis)
      if (i === avis.length - 1) {
        setCurrentAvis(avis[0]);
        return;
      }

      setCurrentAvis(avis[i + 1]);
    }
  }

  return (
    <div className="Avis-content">
      <div className="deco"></div>
      <h2>Ils nous ont fait confiance</h2>
      <div className="Avis-center">
        <img className="simpleArrowLeft" src={simpleArrowLeft} alt="" onClick={previousAvis} />
        <img className="quoteRougeLeft" src={quoteRougeLeft} alt="" />
        <p>{currentAvis}</p>
        <img className="quoteRougeRight" src={quoteRougeRight} alt="" />
        <img className="simpleArrowRight" src={simpleArrowRight} alt="" onClick={nextAvis} />
      </div>
    </div>
  )
}

export default Avis;