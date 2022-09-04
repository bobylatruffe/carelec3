import React from "react";
import { Navigate } from "react-router-dom";

import { fetchRevisions } from "../../../utilitaires/serveurApiStand";

class ShowRevisions extends React.Component {
  state = {
    currentRender: null,
    vehiculeInfos: null,
  }

  findBestRevision = (userKm, revisions) => {
    userKm = parseInt(userKm);
    let bestRevision = null;

    let indexRevisions = Object.keys(revisions);
    let tmpRevisions = indexRevisions.filter(revision => {
      let dataKm = parseInt(revision.replace(/[\u00a0km]/g, ''));
      if (userKm <= dataKm)
        return revision
    })

    if (tmpRevisions.length === 0)
      bestRevision = revisions[indexRevisions.slice(-1)[0]];
    else
      bestRevision = revisions[tmpRevisions[0]];

    return bestRevision;
  }

  componentDidMount() {
    let vehiculeInfos = JSON.parse(sessionStorage.getItem("vehiculeInfos"));
    console.log(vehiculeInfos);
    if (!vehiculeInfos)
      this.setState({
        currentRender: <Navigate to="/" replace />
      })

    fetchRevisions(vehiculeInfos.libelleStandardise)
      .then(revisions => {
        console.log(this.findBestRevision(vehiculeInfos.km, revisions))
      })
      .catch(err => console.log(err.message));

  }

  render() {
    console.log(this.state);
    const currentRender = this.state.currentRender;
    return (
      currentRender
    )
  }
}

export default ShowRevisions;