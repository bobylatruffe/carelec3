import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import "./MesInfos.css";

function MesInfos() {
  const location = useLocation();
  return (
    <div className="mesinfos-container">
      {Object.keys(location.state).map(elem => {
        let current = location.state[elem].toString();
        switch (elem) {
          case "addrPost":
            elem = "Adresse postale"
            break;
          case "cp":
            elem = "Code postale"
            break;
          case "email":
            elem = "Adresse email"
            break;
          case "dateOfBirth":
            elem = "Date de naissance"
            break;
          case "vehiculeInfos":
          case "userId":
            return null
        }
        return <div className="mesinfos-container-info" key={elem}><p className="label">{elem.charAt(0).toUpperCase() + elem.slice(1)} : </p><p className="value">{current}</p></div>
      })}
    </div>
  )
}

export default MesInfos;