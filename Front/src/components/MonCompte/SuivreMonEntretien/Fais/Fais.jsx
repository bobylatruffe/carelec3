import React from "react";
import { fetchCurrentRevisionFais } from "../../../../utilitaires/serveurApi";

import "./Fais.css";

class Fais extends React.Component {
  state = {
    currentRevision: null,
    idCheckFais: null,
  }

  checkFais = async () => {
    this.setState({
      currentRevision: await fetchCurrentRevisionFais(this.props.userId),
      idCheckFais: setTimeout(() => this.checkFais(), 1000)
    })
  }

  async componentDidMount() {
    this.checkFais();
  }

  componentWillUnmount() {
    clearTimeout(this.state.idCheckFais);
    this.setState({});
  }

  render() {
    const currentRevision = this.state.currentRevision;
    return (
      <div className="fais-container">
        <h2>L'état de votre révision</h2>
        <p>Suivez en directe les différentes étapes sur l'avancement de la révison de votre  véhicule</p>
        <div className="fais-children">
          {currentRevision && currentRevision.map(revision => {
            return (
              <div
                className="fais-child"
                key={Math.floor(Math.random() * 10000)}>
                <p>Tâche : </p><p>{revision.intitule}</p>
                <p>Status : </p><p>{revision.status}</p>
                <p>Dernière mise à jours : </p><p>{revision.realiserLe}</p>
                <p>Photos : </p>
                {
                  revision.imgs.map(img => {
                    let pathImg = img.split("/").slice(-1);
                    return (
                      <img
                        alt=""
                        key={Math.floor(Math.random() * 10000)}
                        src={
                          `http://localhost:5000/api/user/${this.props.userId}/imgs/${pathImg}`} />
                    )
                  })
                }
              </div>
            )
          })}
        </div>
      </div >
    )
  }
}

export default Fais;