import React, { useContext, useEffect } from "react";
import * as L from "leaflet";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { useMapEvents } from "react-leaflet";
import { userContext } from "../App";

let color = [
  "#16213E",
  "#0F3460",
  "#533483",
  "#E94560",
  "#191919",
  "#2D4263",
  "#C84B31",
];

function CustomMarker({ saveMarkers }) {
  const [
    state,
    setState,
    setModal,
    setToolsData,
    toolsData,
    markData,
    setMarkData,
  ] = useContext(userContext);

  useEffect(() => {
    if (markData.url || markData.teamName) {
      const iconMarkup = renderToStaticMarkup(
        <div
          style={{
            height: "60px",
            width: "60px",
            padding: "5px",
            boxSizing: "border-box",
            background: "#00F7F7",
            borderRadius: "50%",
            cursor: "pointer",
            overflow: "hidden",
          }}
          className="icon_container  shadow-xl"
        >
          <img
            src={markData.url}
            id="icon"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",

              color: `${color[Math.floor(Math.random() * color.length)]}`,
            }}
            alt={markData.teamName}
          />
        </div>
      );

      const customMarkerIcon = divIcon({
        html: iconMarkup,
        iconAnchor: [30, 40],
      });

      L.marker([state.data.lat, state.data.lng], {
        icon: customMarkerIcon,
      }).addTo(map);
      setMarkData({});
      // } else if (markData.teamName) {
      //   const iconMarkup = renderToStaticMarkup(
      //     <div
      //       style={{
      //         height: "60px",
      //         width: "60px",
      //         padding: "5px",
      //         boxSizing: "border-box",
      //         background: "#F79859",
      //         borderRadius: "50%",
      //         cursor: "pointer",
      //         overflow: "hidden",
      //       }}
      //       className="  shadow-xl"
      //     >
      //       <h1
      //         className=" uppercase text-xl  bg-red-500 rounded-full font-semibold mt-[.7rem]   w-[50px]  text-center"
      //         style={{
      //           WebkitTextFillColor: "white",
      //           WebkitTextStrokeWidth: ".5px",
      //           WebkitTextStrokeColor: "black",
      //         }}
      //       >
      //         {markData.teamName}
      //       </h1>
      //     </div>
      //   );

      //   const customMarkerIcon = divIcon({
      //     html: iconMarkup,
      //     iconAnchor: [30, 40],
      //   });

      //   // const { lat, lng } = e.latlng;
      //   L.marker([state.data.lat, state.data.lng], {
      //     icon: customMarkerIcon,
      //   }).addTo(map);
      //   setMarkData({});
    }
  }, [markData]);

  const map = useMapEvents({
    click: (e) => {
      setModal(true);
      setState({
        ...state,
        data: {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        },
      });
    },
  });

  return null;
}

export default CustomMarker;
