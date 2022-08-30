import { useState } from "react";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom"

import { getUserInfos } from "../../utilitaires/apiServeur";

import "./MonCompte.css"

function MonCompte() {
  const location = useLocation();
  if (!location.state) {
    window.location.replace("http://localhost:3000");
  }

  const [userInfos, setUserInfos] = useState({});

  useEffect(() => {
    async function fetchUserInfo() {
      setUserInfos({
        ...await getUserInfos(location.state.userId),
        userId: location.state.userId
      });
    }
    fetchUserInfo();
  }, [])

  return (
    <div className="moncompte">
      {/* <h1>MonCompte</h1> */}
      <div className="center-elem">
      <Link to="mesinfos" state={userInfos} className="elem">Mes infos</Link>
      <Link to="mavoiture" state={userInfos.vehiculeInfos} className="elem">Ma voiture</Link>
      <Link to="suivremonentretien" state={userInfos} className="elem">Suivre mon entretien</Link>
      <Link to="historique" state={{ ...location.state }} className="elem">Historique</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default MonCompte