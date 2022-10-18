import React, { useState, useRef, useContext, useCallback } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { AiOutlineStock } from "react-icons/ai";
import { BsImage, BsCircle } from "react-icons/bs";
import { MdLayersClear } from "react-icons/md";
import { userContext } from "../App";
import domtoimage from "dom-to-image-improved";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sidebar.css";

function Sidbar() {
  const [state, setState, setModal, setToolsData, toolsData] =
    useContext(userContext);
  const [collaps, setCollaps] = useState(true);

  const [data, setData] = useState(null);
  const reference = useRef();

  const collapsSidebar = () => {
    if (collaps) {
      reference.current.style.transition = "all .5s";
      reference.current.style.left = "-15rem";
    } else {
      reference.current.style.transition = "all .5s";
      reference.current.style.left = "0";
    }
    setCollaps(!collaps);
  };

  const handleLineTool = () => {
    if (!state.marker) {
      setState({ ...state, line: !state.line, tool: "line" });
      toolsData.current._toolbars.draw._modes.polyline.handler.options.shapeOptions =
        { guidelineDistance: 4, color: "#fafa00", weight: 5 };
      toolsData.current._toolbars.draw._modes.polyline.handler.enable();
    } else {
      toast.error("YOUR MARKER TOOL IS RUNNING ALREADY", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCircleTool = () => {
    if (!state.marker) {
      setState({ ...state, tool: "circle" });
      toolsData.current._toolbars.draw._modes.circle.handler.enable();
    } else {
      toast.error("YOUR MARKER TOOL IS RUNNING ALREADY", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleClearTool = () => {
    setState({ ...state, tool: "clear" });
    toolsData.current._toolbars.edit._modes.remove.handler.removeAllLayers();
  };

  const img = useCallback(() => {
    if (state.map._container === null) {
      return;
    }
    domtoimage
      .toPng(state.map._container, {
        cacheBust: true,
        quality: 1,
        scale: 1,
        imagePlaceholder: state.url,

        filter: (e) => {
          if (e.className === "leaflet-control-container") {
            return false;
          } else {
            return true;
          }
        },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "map.png";
        link.href = dataUrl;
        link.click();
        setData(dataUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.map]);

  //   const node = document.querySelector(".leaflet-container");

  //   toPng(state.map._container, { cacheBust: true })
  //     .then((dataUrl) => {
  //       const link = document.createElement("a");
  //       link.download = "my-image-name.png";
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // html2canvas(document.body, {
  //   backgroundColor: "#fff",
  //   foreignObjectRendering: false,
  //   useCORS: true,
  //   scale: 3,
  //   ignoreElements: (el) => {
  //     if (el.classList.contains("leaflet-control-container")) {
  //       return true;
  //     }
  //   },
  // }).then((canvas) => {
  //   let img = canvas
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");

  //   Canvas2image.saveAsImage(canvas);
  //   setData(img);
  //   // console.log(img);
  //   // window.location.href = img;
  // });

  // domtoimage
  //   .toPng(node)
  //   .then((url) => {
  //     let img = new Image();
  //     img.src = url;
  //     console.log(url);
  //   })
  //   .catch((error) => {
  //     console.error("oops, something went wrong!", error);
  //   });
  // };

  return (
    <div className="sidebar" ref={reference}>
      <h1 className=" text-3xl uppercase  font-semibold  text-center mt-5 ">
        pubg mobile map
      </h1>
      <div className="tools text-[.8rem] font-semibold">
        <span>Tools:</span>
        <div className=" grid grid-cols-4 mb-5 font-bold  gap-2">
          <div
            className={`icon bg-[#ff3d00] flex flex-col justify-center items-center p-1 rounded-sm text-[1rem]  cursor-pointer mt-[.20rem]`}
            onClick={() => {
              setState({ ...state, marker: !state.marker, tool: "marker" });
            }}
          >
            <FiMapPin></FiMapPin>{" "}
            <p className="text-[10px] mt-[.20rem]">Marker</p>
          </div>

          <div
            className="icon bg-[#ff3d00] flex flex-col justify-center items-center p-1 rounded-sm text-[1rem] cursor-pointer mt-[.20rem]"
            onClick={handleLineTool}
          >
            <AiOutlineStock></AiOutlineStock>{" "}
            <p className="text-[10px] mt-[.20rem]">Line</p>
          </div>
          <div
            className="icon bg-[#ff3d00] flex flex-col justify-center items-center p-1 rounded-sm text-[1rem] cursor-pointer mt-[.20rem]"
            onClick={handleCircleTool}
          >
            <BsCircle></BsCircle>{" "}
            <p className="text-[10px] mt-[.20rem]">Circle</p>
          </div>

          <div
            className="icon bg-[#ff3d00] flex flex-col justify-center items-center p-1 rounded-sm text-[1rem] cursor-pointer mt-[.20rem]"
            onClick={handleClearTool}
          >
            <MdLayersClear></MdLayersClear>{" "}
            <p className="text-[10px] mt-[.20rem]">Clear</p>
          </div>
          <div
            className="icon bg-[#ff3d00] flex flex-col justify-center items-center p-1 rounded-sm text-[1rem] cursor-pointer mt-[.20rem]"
            onClick={img}
          >
            <BsImage></BsImage> <p className="text-[10px] mt-[.20rem]">Save</p>
          </div>
        </div>

        <h1 className="py-5 text-xl">Download Preivew</h1>
        <div className=" p-1  border mb-5 min-h-[11rem]">
          {data ? (
            <img src={data} alt="img" />
          ) : (
            <span className="  text-center p-5 ">click on the save tool</span>
          )}
        </div>

        <span className="text-center "> More Tools are Comming Soon</span>
      </div>
      <div className="siebar__controller" onClick={collapsSidebar}>
        {collaps ? (
          <FaArrowLeft className="icons" />
        ) : (
          <FaArrowRight className="icons" />
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Sidbar;
