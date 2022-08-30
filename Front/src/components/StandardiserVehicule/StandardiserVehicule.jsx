import { useState } from "react";
import { useNavigate } from "react-router-dom"

import StandardiserVehiculeManual from "./StandardiserVehiculeManual";
import { getStandImmat } from "../../utilitaires/apiServeurStand";

function StandardiserVehicule() {
  const navigate = useNavigate();
  const [userImmat, setUserImmat] = useState('');

  const handlerOnChangeInput = (e) => {
    setUserImmat(e.target.value);
  }

  const handlerOnCLickWithImmat = async () => {
    let vehiculeStand = await getStandImmat(userImmat)
    if (vehiculeStand)
      if (window.confirm(`S'agit-il du véhicule ${vehiculeStand.motorisation} ?`)) {
        const km = prompt("Quel est le kilométrage de votre véhicule ?")
        navigate("/propositionRevision", {
          state: {
            "immat": userImmat,
            "km": km,
            "libelleStandardise": vehiculeStand
          }
        })
        return true;
      }
    window.alert("Impossible d'identifier votre véhicule depuis sa plaque");
  }

  return (
    <div>
      <h1>Identifions votre véhicule :</h1>
      <input type="text" placeholder="CL644BL" onChange={handlerOnChangeInput} />
      <button onClick={handlerOnCLickWithImmat}>Valider</button>

      <StandardiserVehiculeManual />
    </div>
  )
}

export default StandardiserVehicule;