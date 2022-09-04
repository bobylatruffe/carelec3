import Leaflet from "leaflet";
import React from "react";



import { fetchUserAdresse, fetchGaragisteArrive, initGpsSimulateurGaragiste, fetchGaragisteToUserPolyline } from "../../../../utilitaires/serveurApi";
import { postaleToLatLng } from "../../../../utilitaires/dataGouv";

import "./Geoloc.css"

/*

*/
class Geoloc extends React.Component {
  state = {
    map: null,
    userAdresse: {
      postale: null,
      latLgn: [],
    },
    garagisteIsComming: null,
    garagisteMarker: null,
    trajet: [],
  }

  setGaragisteMarkerAndPolyline = ({ garagisteCoords, polylineCoords }) => {
    if (this.state.garagisteMarker && this.state.trajet)
      this.state.garagisteMarker.remove() && this.state.trajet.remove();

    const garagisteMarker = Leaflet.marker(garagisteCoords).addTo(this.state.map);
    garagisteMarker.bindPopup("Dernier mise à jour : " + new Date().toLocaleTimeString()).openPopup();
    const trajet = Leaflet.polyline(polylineCoords).addTo(this.state.map);

    this.state.map.fitBounds([polylineCoords[0], polylineCoords.slice(-1)], { padding: [50, 50] });

    this.setState({
      ...this.state,
      garagisteMarker,
      trajet,
    })
  }

  getGaragisteToUserPolyline = async () => {
    let result = null;
    let interval = null;
    try {
      result = await fetchGaragisteToUserPolyline(this.state.userAdresse.postale);
      this.setGaragisteMarkerAndPolyline(result);
    } catch (err) {
      console.log(err.message);
      window.alert("Le garagiste est chez vous");
      return;
    }
    this.setState({
      garagisteIsComming: setTimeout(() => this.getGaragisteToUserPolyline(), 1000)
    })
  }

  checkGaragisteArrive = async (type, userId) => {
    let result = await fetchGaragisteArrive(type, userId);
    if (result) {
      await initGpsSimulateurGaragiste(this.state.userAdresse.postale);
      this.getGaragisteToUserPolyline();
      return;
    }

    this.setState({ garagisteIsComming: setTimeout(() => this.checkGaragisteArrive(type, userId), 1000) })
  }

  initMap = (userAdresseLatLng) => {
    const map = Leaflet.map(this.props.map, {
      center: userAdresseLatLng,
      zoom: 15,
    });

    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    Leaflet.marker(userAdresseLatLng).addTo(map);

    return map;
  }

  async componentDidMount() {
    const userAdresse = {};
    userAdresse.postale = await fetchUserAdresse(this.props.userId);
    userAdresse.latLgn = await postaleToLatLng(userAdresse.postale);

    const map = this.initMap(userAdresse.latLgn);

    this.checkGaragisteArrive(this.props.type, this.props.userId);

    this.setState({
      ...this.state,
      userAdresse,
      map,
    })
  }

  componentWillUnmount() {
    clearTimeout(this.state.garagisteIsComming);
    this.setState({});
  }

  render() {
    return (
      <div>
        <h2>Suivez en live l'arrivée du garagiste</h2>
        {this.props.type === "pickUp" ?
          <p>Lorsque le garagiste sera en route pour vous déposer votre véhicule, vous pourrez suivre en direct son avancement jusqu'à chez vous.</p>
          :
          <p>Lorsque le garagiste sera en route pour venir récupérer votre véhicule pour son entretien, vous pourrez suivre en direct son avancement jusqu'à chez vous.</p>
        }
        <div id={this.props.map}></div>
      </div>
    )
  }
}

export default Geoloc;