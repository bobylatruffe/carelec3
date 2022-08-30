import { useState } from "react";
import { useNavigate } from "react-router-dom"

import StandardiserVehiculeManual from "./StandardiserVehiculeManual";
import { getStandImmat } from "../../utilitaires/apiServeurStand";

function StandardiserVehicule(props) {
  const navigate = useNavigate();
  const [userImmat, setUserImmat] = useState('');

  const handlerOnChangeInput = (e) => {
    setUserImmat(e.target.value);
  }

  const handlerOnCLickWithImmat = async (e) => {
    e.preventDefault();
    
    let vehiculeStand = await getStandImmat(userImmat)
    if (vehiculeStand)
      if (window.confirm(`S'agit-il du véhicule ${vehiculeStand.motorisation} ?`)) {
        const km = prompt("Quel est le kilométrage de votre véhicule ?");

        if(props.callback) {
          props.callback({
            "immat": userImmat,
            "km": km,
            "libelleStandardise": vehiculeStand
          })

          return true;
        }

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

      <StandardiserVehiculeManual callback={props.callback}/>
    </div>
  )
}

export default StandardiserVehicule;