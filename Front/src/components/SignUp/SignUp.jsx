import { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import * as carelecApi from "../../utilitaires/serveurApi";

import "./SignUp.scss";

function SignUp() {
  const [formData, setFormData] = useState({});
  const navigate = useRef(useNavigate());

  useEffect(() => {
    if(sessionStorage.getItem("userId"))
      navigate.current("/moncompte", {replace: true});
      return;
  }, []);

  const handlerOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.getAttribute("name")]: e.target.value.toLowerCase(),
    })
  }

  const handlerOnSubmit = (e) => {
    e.preventDefault();

    carelecApi.addClient(formData)
      .then(userId => {
        sessionStorage.setItem("userId", userId.userId);
        navigate.current("/moncompte", {replace: true});
        // window.location.reload();
      })
      .catch(err => window.alert("Impossible de créer le compte, il existe déjà ou une autre erreur c'est produite"));
  }

  return (
    <div className="SignUp">

      <div className="textual">
        <h2><span className="red">Créer</span> un compte</h2>
        <p>Prendre un rendez-vous pour un entretien, ou encore suivre l'avancement d'un entretien, il est nécessaire de créer un compte personnel. Quelques petites informations et c'est partie pour qu'on puisse prendre soin de votre véhicule ...</p>
      </div>

      <form onSubmit={handlerOnSubmit}>
        <label htmlFor="nom">Nom : </label>
        <input type="text" name="nom" id="nom" onChange={handlerOnChange} required />
        <br />

        <label htmlFor="prenom">Prénom : </label>
        <input type="text" name="prenom" id="prenom" onChange={handlerOnChange} required />
        <br />

        <label htmlFor="dateOfBirth">Date de naissance : </label>
        <input type="date" name="dateOfBirth" id="dateOfBirth" onChange={handlerOnChange} required />
        <br />

        <label htmlFor="adressePostale">Adresse postale : </label>
        <input type="text" name="adressePostale" id="adressePostale" onChange={handlerOnChange} required />
        <br />

        <label htmlFor="cp">Code postale : </label>
        <input type="text" name="cp" id="cp" onChange={handlerOnChange} required />
        <br />

        <label htmlFor="ville">Ville : </label>
        <input type="text" name="ville" id="ville" onChange={handlerOnChange} required />
        <br />

        <label htmlFor="email">Adresse email : </label>
        <input type="email" name="email" id="email" onChange={handlerOnChange} required />
        <br />

        <label htmlFor="portable">Numéro de portable : </label>
        <input type="text" name="portable" id="portable" onChange={handlerOnChange} required />
        <br />

        <button type="submit">Créer mon compte</button>
      </form>
    </div>
  )
}

export default SignUp;