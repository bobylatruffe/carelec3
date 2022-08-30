import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

function PrendreRdv() {
  const [dateVoulu, setDateVoulu] = useState("");

  const handlerOnChange = (e) => {
    setDateVoulu(e.target.value)
  }

  const location = useLocation();
  if (!location.state) {
    window.location.replace("http://localhost:3000");
  }
  const navigate = useNavigate();
  const handlerOnClick = () => {
    const forInitRevision = {
      ...location.state,
      dateRevision: dateVoulu,
    }

    fetch(`http://localhost:5000/api/user/${location.state.userId}/initRevision`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forInitRevision),
      })
      .then(resp => {
        if (resp.status === 500) {
          window.alert("Impossible de programmé la révision");
          return null;
        }
        navigate("/merci", { state: location.state });
        // return resp.json()
      })
    // .then(resp => {
    //   console.log(resp);
    // })
  }

  console.log(location.state)

  return (
    <div>
      <h1>Prendre rdv</h1>
      <p>Selectionner une date pour votre entretien :</p>
      <input type="date" onChange={handlerOnChange}></input>
      <button onClick={handlerOnClick}>Valider</button>
    </div>
  )
}

export default PrendreRdv