import React from "react";
import { Navigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { checkStatusApi } from "../../utilitaires/serveurApi";

class Connexion extends React.Component {
  state = {
    email: "",
    portable: "",
    currentRender: null,
  }

  componentDidMount() {
    this.setState({
      currentRender: <div>
        <h1>Connexion</h1>
        <form onSubmit={this.handlerSubmit}>
          <label htmlFor="email">Email : </label>
          <input type="email" id="email" onChange={this.handlerChange} required />

          <label htmlFor="portable">Numéro portable : </label>
          <input type="tel" id="portable" onChange={this.handlerChange} required />

          <button type="submit">Connexion</button>
          <button type="button" onClick={this.handlerSignUp}>Créer un compte</button>
        </form>
      </div>
    })
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.getAttribute("id")]: e.target.value,
    })
  }

  handlerSubmit = async (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/user/connexion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state)
    }).then(response => checkStatusApi(response.status, response.json()))
      .then(resp => {
        sessionStorage.setItem("userId", resp.userId);
        this.setState({
          currentRender: <Navigate to="/moncompte" replace />,
        })
      })
      .catch(err => window.alert(err.message))
  }

  handlerSignUp = () => {
    this.setState({
      currentRender: <Navigate to="/signup" />
    })
  }

  render() {
    console.log(this.state);
    const currentRender = this.state.currentRender;
    return (
      currentRender
    )
  }
}

export default Connexion;
