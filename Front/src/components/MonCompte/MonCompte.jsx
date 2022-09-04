import { useState, useEffect, Fragment } from "react";
import { Link, Navigate, Outlet, } from "react-router-dom";
import { checkAuth } from "../../utilitaires/gestionCompte";

import { fetchUserInfos } from "../../utilitaires/serveurApi";

function getHtmlMonCompte(userInfos, userId) {
  return (
    <div className="moncompte">
      <h1>Bonjour {userInfos.nom} {userInfos.prenom}</h1>
      <nav>
        <Link to="mesinformations" state={{
          userInfos,
        }}>Mes informations personnelles</Link>
        <Link to="suivremonentretien" state={{ userId, }}>Suivre mon entretien</Link>
        {/* <Link to="monhistorique" state={{userId,}}>Mon historique</Link> */}
      </nav>
    </div>
  )
}

function getHtmlErreur() {
  return <Navigate to="/connexion" state={{ from: "moncompte" }} />
}

export default function MonCompte() {
  const [userId, setUserId] = useState(null);
  const [userInfos, setUserInfos] = useState(null);
  const [returnRender, setReturnRender] = useState(null);

  useEffect(() => {
    setUserId(checkAuth());
  }, []);

  useEffect(() => {
    // on ignore la 1er execution lors du 1er chargement
    if (userId == null) return;
    if (userId > 0) {
      fetchUserInfos(userId)
        .then(userInfos => {
          setUserInfos(userInfos);
        })
        .catch(err => {
          // peu probable que ce catch soit exécuté.
          console.log(err.message);
          setReturnRender(getHtmlErreur());
        });
    } else {
      console.log("Tentative d'accès direct sans connexion ( avec un userId) à moncompte");
      setReturnRender(getHtmlErreur());
    }
  }, [userId]);

  useEffect(() => {
    if (userInfos !== null)
      setReturnRender(getHtmlMonCompte(userInfos, userId));
  }, [userInfos, userId]);

  return (
    <Fragment>
      {returnRender}
      <Outlet />
    </Fragment>
  );
}