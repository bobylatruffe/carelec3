import React from "react";

import { getCurrentResumerEdl, setCurrentRevisionEdl } from "../../utilitaires/apiServeur";

import cotesConducteur from "./cotesConducteur.png";
import cotesPassager from "./cotesPassager.png";
import cotesAvant from "./cotesAvant.png";
import cotesDerriere from "./cotesDerriere.png";
import croixRouge from "./croixRouge.png"

import "./EtatDesLieux.css"

class EtatDesLieux extends React.Component {
  state = {
    croixRouges: [],
  }

  componentDidMount = () => {
    getCurrentResumerEdl(148552793)
      .then(etatDesLieux => {
        this.setState({ croixRouges: etatDesLieux[this.props.type].croixRouges })
      });
  }

  handlerOnClick = (croixRouge) => {
    alert(croixRouge.target.getAttribute("data-comment"));
  }

  handlerAdminOnClick = (e) => {
    // attention layerN n'est pas en voie de standardisation !!!
    let newCroixRouge = {
      x: e.nativeEvent.layerX - 6 + "px",
      y: e.nativeEvent.layerY - 9 + "px",
      comment: prompt("Commentaire", "")
    }

    setCurrentRevisionEdl(148552793, this.props.type, newCroixRouge)
      .then(resp => alert(resp.message))
      .catch(err => alert(err));

    let currentCroixRouges = Object.assign([], this.state.croixRouges);
    currentCroixRouges.push(newCroixRouge);
    this.setState({
      croixRouges: currentCroixRouges,
    })
  }

  render() {
    console.log(this.state)

    // afficher les croixRouges
    let keyCroixRouge = 0;
    const croixRouges = this.state.croixRouges.map(croix => {
      return <img
        className="croixRouges"
        src={croixRouge}
        alt="croix rouge"
        style={{
          "top": croix.y,
          "left": croix.x,
        }}
        key={"croixRouge" + keyCroixRouge++}
        data-comment={croix.comment}
        onClick={this.handlerOnClick}
      />
    })

    const admin = this.props.admin

    return (
      <div className="etatDesLieux">
        <h1>Etat des lieux</h1>
        <img src={cotesConducteur} useMap="#image-map-cotesConducteur" alt="" />
        <map
          name="image-map-cotesConducteur"
          onClick={admin ? this.handlerAdminOnClick : null}
          className={admin ? "adminMap" : null}
        >
          {/* https://www.image-map.net/ */}
          <area coords="20,34,37,29,54,26,70,25,96,12,113,4,138,0,175,1,200,4,217,12,236,20,251,24,265,24,270,29,271,40,273,48,275,57,272,68,252,72,242,73,234,76,226,87,211,87,197,79,190,72,180,73,128,74,72,75,59,84,52,87,42,86,32,83,22,75,8,73,1,63,2,44" shape="poly" alt="" />
        </map>
        <p>Côté conducteur</p>

        <img src={cotesPassager} useMap="#image-map-cotesPassager" alt="" />
        <map
          name="image-map-cotesPassager"
          onClick={admin ? this.handlerAdminOnClick : null}
          className={admin ? "adminMap" : null}
        >
          <area coords="102,0,123,0,145,1,166,6,187,15,202,23,217,27,241,30,263,36,271,41,274,55,275,66,272,72,260,76,251,77,243,83,233,89,216,87,207,76,196,75,162,75,122,75,87,74,81,75,76,82,67,89,51,87,40,78,34,74,21,73,7,70,0,61,1,47,4,40,8,24,35,23,58,10,75,3" shape="poly" alt="" />
        </map>
        <p>Côté passager</p>

        <img src={cotesAvant} useMap="#image-map-cotesAvant" alt="" />
        <map
          name="image-map-cotesAvant"
          onClick={admin ? this.handlerAdminOnClick : null}
          className={admin ? "adminMap" : null}
        >
          <area coords="74,0,103,1,122,3,132,15,140,29,153,25,160,29,161,35,151,39,154,48,159,59,159,76,158,93,158,110,148,116,136,114,133,104,118,103,79,102,34,105,27,105,28,112,19,115,5,111,4,95,2,58,8,47,12,41,2,37,2,31,10,25,20,26,21,32,31,15,37,7,50,1" shape="poly" alt="" />
        </map>
        <p>Avant</p>

        <img src={cotesDerriere} useMap="#image-map-cotesDerriere" alt="" />
        <map
          name="image-map-cotesDerriere"
          onClick={admin ? this.handlerAdminOnClick : null}
          className={admin ? "adminMap" : null}
        >
          <area coords="61,2,85,2,108,2,124,5,133,17,140,28,148,30,149,38,152,46,156,58,157,71,156,81,156,97,153,107,147,111,135,111,128,110,128,95,31,96,31,105,26,110,15,111,4,107,1,95,2,83,0,68,4,51,9,40,9,31,18,26,22,19,28,9,39,3" shape="poly" alt="" />
        </map>
        <p>Derrière</p>

        {croixRouges}
      </div>
    )
  }
}

export default EtatDesLieux;