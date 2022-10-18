import React, { useEffect, useState, useContext, useRef } from "react";
import { userContext } from "../App";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
// import MapPrint from "../components/MapPrint";
import CustomMarker from "../components/CustomMarker";

//import fullscreen mode main js
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";
//import fullscreen mode css
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
// import compability css file
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import "leaflet-defaulticon-compatibility";
//import leaflet css
import "leaflet/dist/leaflet.css";
// new plugins
import "leaflet-draw/dist/leaflet.draw.css";

const MAP_POSITION = [0, 0];
const OFLINE_URL = "./map/{z}/{x}/{y}.png";

function Map() {
  const [state, setState, setModal, setToolsData] = useContext(userContext);

  const editRef = useRef();
  const mapRef = useRef();

  let [datas, setDatas] = useState([]);

  const saveMarkers = (newMarkerCoords) => {
    const newLocation = [datas, newMarkerCoords];
    setDatas(() => ({ newLocation }));
  };

  useEffect(() => {
    setToolsData(mapRef);
    setState({ ...state, map: editRef.current });

    document
      .querySelector(".leaflet-control-container")
      .firstChild.classList.replace("leaflet-left", "leaflet-right");
    // set custom attribute
    document
      .querySelector(".leaflet-control-attribution")
      .children[0].setAttribute("href", "https://fazlulkarim.netlify.app/");
    document
      .querySelector(".leaflet-control-attribution")
      .children[0].setAttribute("target", "_blank");
    document.querySelector(
      ".leaflet-control-attribution"
    ).children[0].innerText = "Develop By Md. Fazlul Karim";
  }, []);

  return (
    <MapContainer
      editable={true}
      center={MAP_POSITION}
      minZoom={2}
      zoom={2}
      maxZoom={5}
      zoomControl={true}
      scrollWheelZoom={true}
      fullscreenControl={true}
      whenReady={(e) => (editRef.current = e.target)}
      style={{
        width: "100vw",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      <TileLayer
        url={OFLINE_URL}
        noWrap="true"
        continuosWorld="false"
      />

      {/* <Marker position={MARKER_POSITION}>
          <Popup>Hello I'm a popup!</Popup>
        </Marker> */}

      {state.marker ? <CustomMarker saveMarkers={saveMarkers} /> : ""}

      {/* <MapPrint
        position="topleft"
        sizeModes={["Current", "A4Portrait", "A4Landscape"]}
        hideControlContainer={false}
        title="Print"
      />
      <MapPrint
        position="topleft"
        sizeModes={["Current", "A4Portrait", "A4Landscape"]}
        hideControlContainer={false}
        title="Export as PNG"
        exportOnly
      /> */}
      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            rectangle: false,
            polyline: true,
            circle: true,
            circlemarker: false,
            marker: false,
            polygon: false,
          }}
          edit={{
            edit: false,
            remove: true,
          }}
          onMounted={(e) => (mapRef.current = e)}
        />
      </FeatureGroup>
    </MapContainer>
    // </ReactLeafletEditable>
  );
}

export default Map;
