import React from "react";
import Leaflet, { LatLng } from "leaflet";

import { getUserAdressCoord, getAdminCoord } from "../../utilitaires/apiServeur"
import { getPolyline } from "../../utilitaires/gps";
import polylineEncoded from "polyline-encoded";

import "./Geoloc.css"

class Geoloc extends React.Component {
  state = {
    oldPolyline: null,
  }

  mettreAJourPolyline = async (map, garagisteCoord, userCoord) => {
    let polyline = await getPolyline([garagisteCoord[1], garagisteCoord[0]], userCoord);
    polyline = polylineEncoded.decode(polyline);
    
    if (this.state.oldPolyline)
      this.state.oldPolyline.remove();

    polyline = Leaflet.polyline(polyline);
    polyline.addTo(map);

    this.setState({
      oldPolyline: polyline,
    })
  }

  mettreAJourGaragisteMarker = (map, garagisteMarker, userCoord) => {
    const interval = setInterval(async () => {
      let garagisteCoord;
      try {
        garagisteCoord = await getAdminCoord();
      } catch (err) {
        alert("Le garagiste est chez vous");
        clearInterval(interval);
        return null;
      }
      this.mettreAJourPolyline(map, garagisteCoord, userCoord);
      garagisteMarker.setLatLng(new LatLng(garagisteCoord[0], garagisteCoord[1]));
      garagisteMarker.bindPopup("Dernière maj : " + new Date().toTimeString().slice(0, 8)).openPopup();
      map.flyToBounds([[userCoord[1], userCoord[0]], garagisteCoord])
    }, 1000);
  }

  async componentDidMount() {
    const userCoord = await getUserAdressCoord(148552793)

    let map = Leaflet.map("map").setView([userCoord[1], userCoord[0]], 10);
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // voir doc Leaflet
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const userMarker = Leaflet.marker([userCoord[1], userCoord[0]]);
    userMarker.addTo(map);
    // userMarker.bindPopup("Le garagiste est en route...").openPopup();

    let garagisteCoord = await getAdminCoord();
    let garagisteMarker = Leaflet.marker([garagisteCoord[0], garagisteCoord[1]]);
    garagisteMarker.addTo(map);

    map.flyToBounds([[userCoord[1], userCoord[0]], garagisteCoord]);

    this.mettreAJourGaragisteMarker(map, garagisteMarker, userCoord);
  }

  render() {
    return (
      <div className="Geoloc">
        <h1>Geoloc</h1>
        <div id="map"></div>
      </div>
    )
  }
}

export default Geoloc;