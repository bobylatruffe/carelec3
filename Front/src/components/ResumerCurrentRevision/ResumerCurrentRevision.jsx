import React from "react";

import { getCurrentResumerSimple } from "../../utilitaires/apiServeur";

class ResumerCurrentRevision extends React.Component {
  state = {
    motorisation: "",
    km: "",
    aFaire: [],
  }

  componentDidMount = () => {
    getCurrentResumerSimple(148552793)
      .then(currentResumerSimple => this.setState(currentResumerSimple))
  }

  render() {
    const { motorisation, km, aFaire } = this.state;
    let keyIndexLi = 0;

    return (
      <div className="resumerCurrentRevision">
        <p>Votre véhicule : </p><p>{motorisation}</p>
        <p>Kilométrage du véhicule : </p><p>{km} km</p>
        <p>Tâches à réaliser :</p>
        <ul>
          {aFaire.map(elem => <li key={keyIndexLi++}>{elem}</li>)}
        </ul>
      </div >
    )
  }
}

export default ResumerCurrentRevision;