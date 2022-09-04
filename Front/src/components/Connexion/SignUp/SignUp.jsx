import React from "react";
import { Navigate } from "react-router-dom";
import { checkStatusApi } from "../../../utilitaires/serveurApi";

class SignUp extends React.Component {
  state = {
    vehicule: null,
    revisionProgramme: null,
    lastRevision: null,
    currentRender: null,
  }

  componentDidMount() {
    this.setState({
      currentRender: <div>
        <h1>Créer un compte</h1>
        <form onSubmit={this.handlerSubmit}>

          <label htmlFor="nom">Nom : </label>
          <input type="text" id="nom" onChange={this.handlerChange} required />

          <label htmlFor="prenom">Prénom : </label>
          <input type="text" id="prenom" onChange={this.handlerChange} required />

          <label htmlFor="dateOfBirth">Date de naissance : </label>
          <input type="date" id="dateOfBirth" onChange={this.handlerChange} required />

          <label htmlFor="portable">Numéro de portable : </label>
          <input type="tel" id="portable" onChange={this.handlerChange} required />

          <label htmlFor="email">Adresse mail: </label>
          <input type="email" id="email" onChange={this.handlerChange} required />

          <label htmlFor="addrPost">Adresse postale : </label>
          <input type="text" id="addrPost" onChange={this.handlerChange} required />

          <label htmlFor="cp">Code postale : </label>
          <input type="text" id="cp" onChange={this.handlerChange} required />

          <label htmlFor="ville">Ville : </label>
          <input type="text" id="ville" onChange={this.handlerChange} required />

          <button type="submit">Connexion</button>
        </form>
      </div>
    })
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.getAttribute("id")]: e.target.value,
    })
  }

  handlerSubmit = (e) => {
    e.preventDefault();

    let rawData = Object.assign({}, this.state);
    delete rawData.currentRender;

    fetch("http://localhost:5000/api/user/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rawData, null, 2)
    }).then(response => checkStatusApi(response.status, response.json()))
      .then(resp => {
        sessionStorage.setItem("userId", resp.id);
        this.setState({
          currentRender: <Navigate to="/moncompte" replace />
        })
      })
      .catch(err => window.alert(err.message))
  }

  render() {
    const currentRender = this.state.currentRender;
    return (
      currentRender
    )
  }
}

export default SignUp;