import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

import StandardiserVehicule from "../StandardiserVehicule/StandardiserVehicule";

function SignUp() {

  const [userInfos, setUserInfos] = useState({});
  const [vehiculeInfos, setVehiculeInfos] = useState(null);

  useEffect(() => {
    setUserInfos({
      ...userInfos,
      vehiculeInfos,
    })
  }, [vehiculeInfos]);

  const handlerOnChange = (e) => {
    console.log(e.target.name)
    setUserInfos({
      ...userInfos,
      [e.target.name]: e.target.value,
    })
  }

  const navigate = useNavigate();
  const handlerOnClick = (e) => {
    e.preventDefault();

    if (vehiculeInfos === null) {
      window.alert("Merci de renseigner votre véhicule.")
      return null;
    }

    fetch("http://localhost:5000/api/user/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfos, null, 2)
    })
    .then(resp => {
      if(resp.status === 500) {
        // j'aurai du prévoir une gestion des erreurs avec des new Error() pour les faires
        // remonter, et réussir à les affichers la !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        window.alert("Impossible de créer votre compte ...")
        return null;
      }

      window.alert("Félicitation votre compte est crée");
      navigate("/moncompte");
    })
  }

  return (
    <div>
      <h1>Vos informations :</h1>
      <form onSubmit={(e) => handlerOnClick(e)}>
        <label>Nom :
          <input type="text" name="nom" id="nom" required="required" onChange={handlerOnChange} />
        </label>

        <label>Prénom :
          <input type="text" name="prenom" id="prenom" required="required" onChange={handlerOnChange} />
        </label>

        <label>Date de naissance :
          <input type="date" name="dateOfBirth" id="dateOfBirth" required="required" onChange={handlerOnChange} />
        </label>

        <label>Adresse postale :
          <input type="text" name="addrPost" id="addrPost" required="required" onChange={handlerOnChange} />
        </label>

        <label>Ville :
          <input type="text" name="ville" id="ville" required="required" onChange={handlerOnChange} />
        </label>

        <label>Code postale :
          <input type="text" name="cp" id="cp" required="required" onChange={handlerOnChange} />
        </label>

        <label>Adresse mail :
          <input type="email" name="email" id="email" required="required" onChange={handlerOnChange} />
        </label>

        <label>Portable :
          <input type="text" name="portable" id="portable" required="required" onChange={handlerOnChange} />
        </label>

        <StandardiserVehicule callback={(data) => setVehiculeInfos(data)} />

        <button>Créer mon compte</button>
      </form>
    </div>
  )
}

export default SignUp;