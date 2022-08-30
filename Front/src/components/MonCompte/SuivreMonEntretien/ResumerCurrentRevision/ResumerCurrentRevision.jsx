import React from "react";

import { getCurrentResumerSimple } from "../../../../utilitaires/apiServeur";

import "./ResumerCurrentRevision.css";

class ResumerCurrentRevision extends React.Component {
  state = {
    motorisation: "",
    km: "",
    aFaire: [],
  }

  componentDidMount = () => {
    getCurrentResumerSimple(this.props.userId)
      .then(currentResumerSimple => this.setState(currentResumerSimple))
      .catch(err => {
        window.alert("Pas de révision programmé");
      });
  }

  render() {
    const { motorisation, km, aFaire } = this.state;
    let keyIndexLi = 0;

    if (this.state.motorisation !== '')
      return (
        <div className="ResumerCurrentRevision">
          {/* <h1>Resumer</h1> */}
          <div className="ResumerCurrentRevision-container">
            <p className="label">Votre véhicule : </p><p className="value">{motorisation}</p>
          </div>
          <div className="ResumerCurrentRevision-container">
            <p className="label">Kilométrage du véhicule : </p><p className="value">{km} km</p>
          </div>
          <div className="ResumerCurrentRevision-container">
            <p className="label">Tâches à réaliser :</p>
            <ul className="value">
              {aFaire.map(elem => <li key={keyIndexLi++} >{elem}</li>)}
            </ul>
          </div>
        </div >
      )
  }
}

export default ResumerCurrentRevision;