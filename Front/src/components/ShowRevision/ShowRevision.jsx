import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getRevision } from "../../utilitaires/apiServeurStand";

function ShowRevision() {
  const location = useLocation();
  if (!location.state) {
    window.location.replace("http://localhost:3000");
  }

  const [aFaire, setAFaire] = useState([]);
  useEffect(() => {
    async function fetchRevision() {
      const kmUser = parseInt(location.state.km);
      const { marque, modele, motorisation } = location.state.libelleStandardise;
      const revision = await getRevision(marque, modele, motorisation)

      let revisionPropose = revision[
        Object.keys(revision).find(elem => {
          let kmCurrent = parseInt(elem.replace(/[\u00a0km]/g, ''));
          if (kmUser <= kmCurrent)
            return elem;
          return null;
        })
      ]

      if (!revisionPropose)
        revisionPropose = revision[Object.keys(revision).slice(-1)[0]];

      setAFaire(revisionPropose);
    }
    fetchRevision();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate();
  const handlerOnClick = () => {
    // faut vérifier si l'user est connecter ! peut être session ou autre ... à voir 
    navigate("/connexion", {
      state: {
        vehiculeInfos: location.state,
        revisionsAFaire: aFaire,
      }
    })


  }

  return (
    <div>
      <p>Voici ce que nous allons faire pour votre véhicule :</p>
      <ul>
        {aFaire.map(elem => <li key={elem}>{elem}</li>)}
      </ul>
      <button onClick={handlerOnClick}>Prendre rendez-vous</button>
    </div>
  )
}

export default ShowRevision;