import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMarques, getModels, getMotors } from "../../utilitaires/apiServeurStand";

function StandardiserVehiculeManual() {
  const [marquesTab, setMarquesTab] = useState([]);
  const [currentMarque, setCurrentMarque] = useState("");

  useEffect(() => {
    async function fetchMarques() {
      setMarquesTab(await getMarques());
      setCurrentModel("");
    }
    fetchMarques();
  }, [])

  const handlerOnChangeCurrentMarque = (e) => {
    setCurrentMarque(e.target.value);
  }


  const [modelsTab, setModelsTab] = useState([]);
  const [currentModel, setCurrentModel] = useState("");

  useEffect(() => {
    async function fetchModels() {
      setModelsTab(await getModels(currentMarque));
    }
    if (currentMarque === '') return undefined
    fetchModels();
    setMotorsTab([]);
    setCurrentModel('');
    setCurrentMotor('');
  }, [currentMarque])

  const handlerOnChangeCurrentModel = (e) => {
    setCurrentModel(e.target.value);
  }


  const [motorsTab, setMotorsTab] = useState([]);
  const [currentMotor, setCurrentMotor] = useState("");

  useEffect(() => {
    async function fetchMotors() {
      setMotorsTab(await getMotors(currentMarque, currentModel.slice(0, -5)));
    }
    if (currentModel === '') return undefined
    fetchMotors()
    setCurrentMotor('')
  }, [currentModel])


  const handlerOnChangeCurrentMotor = (e) => {
    setCurrentMotor(e.target.value);
  }

  const navigate = useNavigate();
  const handlerOnClick = () => {
    if (currentMotor) {
      const userImmat = prompt("Donnez nous votre plaque d'immatriculation : ");
      // faut vérifier que c'est des chiffres !
      const km = prompt("Quel est le kilométrage de votre véhicule ? ");
      navigate("/propositionRevision", {
        state: {
          "immat": userImmat,
          "km": km,
          "libelleStandardise": {
            "marque": currentMarque,
            "modele": currentModel,
            "motorisation": currentMotor,
            "cv": currentMotor.split(" ").slice(-1)[0].slice(0, -2),
          }
        }
      })
      return true;
    }

    window.alert("Merci de séléctionner votre véhicule");
    return null;
  }

  return (
    <div>
      <select onChange={handlerOnChangeCurrentMarque}>
        <option value="">Choisissez la marque</option>
        {marquesTab.map(marque => <option value={marque} key={marque}>{marque}</option>)}
      </select>
      <select onChange={handlerOnChangeCurrentModel}>
        <option value="">Choisissez le modèle</option>
        {modelsTab.map(model => <option value={model} key={model}>{model.slice(0, -5)}</option>)}
      </select>
      <select onChange={handlerOnChangeCurrentMotor}>
        <option value="">Choisissez la motorisation</option>
        {motorsTab.map(motor => <option value={motor} key={motor}>{motor}</option>)}
      </select>

      <button onClick={handlerOnClick}>Valider</button>
    </div>
  )
}

export default StandardiserVehiculeManual;