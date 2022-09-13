import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { checkStatusApi } from "../../utilitaires/serveurApi";
import { getUserInfos } from "../../utilitaires/serveurApi";

import "./Connexion.scss";
import femmecafe from "./femmecafe.png";

function Connexion() {
  const [email, setEmail] = useState("");
  const [portable, setPortable] = useState("");

  const navigate = useRef(useNavigate());

  useEffect(() => {
    const sessionUserid = sessionStorage.getItem("userId");

    async function checkUserId(sessionUserId) {
      let userInfos = null;
      try {
        userInfos = await getUserInfos(sessionUserId);
      } catch (err) {
        return Promise.reject(err.message);
      }

      return userInfos;
    }
    
    if (sessionUserid) {
      checkUserId(sessionUserid)
        .then(userInfos => navigate.current("/moncompte", {replace: true}))
        .catch(err => {
          console.log(err);
          navigate.current("/connexion", { replace: true });
          return;
        });
    }
  }, []);

  const handlerOnChange = (e) => {
    switch (e.target.getAttribute("name")) {
      case "email":
        setEmail(e.target.value.toLowerCase());
        break;
      case "portable":
        setPortable(e.target.value.toLowerCase());
        break;

      default:
        ;
    }
  }

  const handlerOnClick = async (e) => {
    if (!email || !portable) {
      alert("Merci de renseigner l'email et le numéro de portable");
      return;
    }

    fetch("http://localhost:5000/api/user/connexion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        portable,
      })
    }).then(response => checkStatusApi(response.status, response.json()))
      .then(userId => {
        sessionStorage.setItem("userId", userId.userId);
        navigate.current("/moncompte");
        // window.location.reload();
      })
      .catch(err => window.alert(err.message))
  }

  return (
    <div className="Connexion">
      <div className="content">
        <h2><span className="red">Connectez-vous</span> ou créer un compte</h2>
        <p>Afin de prendre RDV pour entretenir votre véhicule, ou encore consulter l'avancement d'un entretien déjà programmé, il est nécessaire de se connecter à votre espace client.</p>
        <div className="verticalCenter">
          <input
            name="email"
            type="email"
            placeholder="bozlak.fatih@gmail.com"
            onChange={handlerOnChange} />
          <input
            name="portable"
            placeholder="0636679200"
            onChange={handlerOnChange} />
          <button onClick={handlerOnClick}>Se connecter</button>
          <NavLink to="/signup">Créer un compte</NavLink>
        </div>
      </div>
      <img src={femmecafe} alt="" />
    </div>
  )
}

export default Connexion;