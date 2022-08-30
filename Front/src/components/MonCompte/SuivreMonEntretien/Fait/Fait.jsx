import React from "react";

import { getCurrentResumerFait } from "../../../../utilitaires/apiServeur";

import "./Fait.css"

class Fait extends React.Component {
  state = {
    fait: [],
    imgZoom: null,
  }

  componentDidMount = () => {
    getCurrentResumerFait(this.props.userId)
      .then(fait => {
        this.setState({
          fait,
        })
      })
  }

  handlerOnClickImg = (e) => {
    this.setState({
      imgZoom:
        <div className="fait-img-zoom">
          <img src={e.target.src} alt="" />
          <button onClick={() => this.setState({ imgZoom: null })}>Fermer</button>
        </div>
    })
  }

  render() {
    const renderFait =
      this.state.fait.map(elem => {
        return (
          <div className="fait-separator" key={elem.intitule}>
            <p>Status : {elem.status}</p>
            <p>Tâche à réaliser : {elem.intitule}</p>
            {elem.imgs.map(img => {
              const imgName = img.split("/").slice(-1)[0];
              return (
                <img
                  src={`http://localhost:5000/api/user/148552793/imgs/${imgName}`}
                  key={imgName}
                  onClick={this.handlerOnClickImg}
                  alt=""
                />
              )
            })}
            <p>Dernière mis à jour : {elem.realiserLe}</p>
          </div>
        )
      })

    return (
      <div className="fait">
        {/* <h1>Fait</h1> */}
        {renderFait}
        {this.state.imgZoom}
      </div>
    )
  }
}

export default Fait;