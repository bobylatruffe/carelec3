import React from "react";

import { fetchRevisionsHistory } from "../../../utilitaires/serveurApi";
import ResumerEntretien from "../SuivreMonEntretien/ResumerEntretien/ResumerEntretien";
import EtatDesLieux from "../SuivreMonEntretien/EtatDesLieux/EtatDesLieux";

class MonHistorique extends React.Component {
  state = {
    userId: null,
    allRevisions: []
  }

  async componentDidMount() {
    const userId = sessionStorage.getItem("userId");
    this.setState({
      userId,
      allRevisions: await fetchRevisionsHistory(userId)
    })
  }

  render() {
    const allRevisions = this.state.allRevisions;
    const userId = this.state.userId;
    console.log(allRevisions);
    return (
      <div>
        <h1>Mon historique de révisions</h1>
        {allRevisions && allRevisions.map(revisionX => {
          const dateRevisonsX = Object.keys(revisionX)[0];
          revisionX = revisionX[dateRevisonsX];
          console.log(revisionX);
          const croixRougesPickUp = revisionX.etatDesLieux.pickUp.croixRouges;
          const croixRougesDropUp = revisionX.etatDesLieux.dropUp.croixRouges;
          console.log(croixRougesPickUp);
          console.log(croixRougesDropUp);
          const fait = revisionX.fait;
          console.log(fait);
          return (
            <div key={Math.floor(Math.random() * 1000)}>
              <h3>Date de l'entretien : {dateRevisonsX}</h3>
              <ResumerEntretien
                vehiculeInfos={revisionX.vehiculeInfos}
                aFaire={revisionX.aFaire}
              />
              <EtatDesLieux userId={userId} croixRouges="lol" admin="" type="dropUp" />
            </div>
          )
        })}
      </div>
    )
  }
}

export default MonHistorique;