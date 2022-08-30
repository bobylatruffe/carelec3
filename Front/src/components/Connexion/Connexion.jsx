import { useState } from "react"
import { createPath, useLocation, useNavigate } from "react-router-dom";


import hash from "../../utilitaires/hash";

import "./Connexion.css";

function Connexion() {
  const [email, setEmail] = useState('bozlak.fatih@gmail.com');
  const [portable, setPortable] = useState('0636679200');

  const handlerOnChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlerOnChangePortable = (e) => {
    setPortable(e.target.value);
  }

  const navigate = useNavigate();
  const location = useLocation();
  const handlerOnClickConnexion = (e) => {
    e.preventDefault();

    const userId = hash(portable + email);
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then(resp => {
        if (resp.status === 500) {
          window.alert("Impossible de se connecter, créer un compte");
          return null;
        }

        if (location.state) {
          location.state = {
            ...location.state,
            userId: userId,
          }

          navigate("/prendrerdv", { state: location.state })
        } else
          navigate("/moncompte", {
            state: {
              userId,
            }
          })
      })
  }

  console.log(location.state);

  const handlerOnClickSignUp = () => {
    navigate("/signup", { state: location.state });
  }

  return (
    <div className="connexion">
      <form>
        <label htmlFor="email">Email :</label>
        <input id="email" type="email" required onChange={handlerOnChangeEmail} placeholder="bozlak.fatih@gmail.com"></input>
        <br />
        <label htmlFor="portable">Portable :</label>
        <input id="portable" type="text" required onChange={handlerOnChangePortable}></input>
        <br />
        <button onClick={handlerOnClickConnexion}>Connexion</button>
      </form>
      <button onClick={handlerOnClickSignUp}>Créer un compte</button>
    </div>
  )
}

export default Connexion