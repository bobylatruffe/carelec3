import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { tryToStand } from "../../utilitaires/serveurApiStand";

class Standardise extends React.Component {
  state = {
    immat: null,
    km: null,
    libelleStandardise: null,
    currentRender: null,
  }

  componentDidMount() {
    sessionStorage.removeItem("vehiculeInfos");
    this.setState({
      currentRender:
        <div>
          <h1>Identifions votre véhicule</h1>
          <label htmlFor="immat">Saisissez votre plaque d'immatriculation : </label>
          <br />
          <input type="text" id="immat" onChange={this.handlerChange} />
          <br />
          <button onClick={this.handlerAuto}>Identifier mon véhicule</button>
          <br />
          <button>Rechercher manuellement</button>
        </div>
    })
  }

  handlerChange = (e) => {
    this.setState({
      immat: e.target.value,
    })
  }

  getKm = () => {
    // faut vérifier qu'il s'agit d'un entier .........
    const km = prompt("Quel est le kilométrage de votre véhicule ?");
    this.setState({
      km,
    })

    return km;
  }

  handlerAuto = () => {
    tryToStand(this.state.immat)
      .then(stand => {
        let vehiculeInfos = {
          immat: this.state.immat,
          km: this.getKm(),
          libelleStandardise: stand
        }

        sessionStorage.setItem("vehiculeInfos", JSON.stringify(vehiculeInfos));

        this.setState({
          currentRender: <Navigate to="showrevisions" />
        })
      })
      .catch(err => window.alert(err.message + ".\nEssayer avec la recherche manuelle"))
  }

  render() {
    const currentRender = this.state.currentRender;
    return (
      currentRender
    )
  }
}

export default Standardise;