import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUserInfos } from "../../utilitaires/serveurApi";

import "./MonCompte.scss";

function MonCompte(e) {
  const [userInfos, setUserInfos] = useState(null);

  const nav = useRef(useNavigate());

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
        .then(userInfos => setUserInfos(userInfos))
        .catch(err => {
          console.log(err);
          nav.current("/connexion", { replace: true });
          return;
        });
    } else
      nav.current("/connexion", { replace: true });
    return;
  }, []);

  useEffect(() => {
    if (userInfos) {

    }
  }, [userInfos]);

  const handlerDeconnexion = () => {
    sessionStorage.removeItem("userId");
  }

  return (
    <div className="MonCompte">
      <h1>Bonjour {userInfos && userInfos.nom}</h1>
      <Link to="/connexion" replace onClick={handlerDeconnexion}>Deconnexion</Link>
    </div>
  )
}

export default MonCompte