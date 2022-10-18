import React, { createContext, useState } from "react";
import Map from "./pages/Map";
import Sidbar from "./components/Sidbar";
import Modal from "./components/Modal";

export const userContext = createContext();

function App() {
  const [state, setState] = useState({
    marker: false,
    tool: "",
    line: true,
    save: false,
    modal: false,
    data: null,
    map: null,
  });

  const [modal, setModal] = useState(false);
  const [toolsData, setToolsData] = useState();
  const [markData, setMarkData] = useState({});

  return (
    <userContext.Provider
      value={[
        state,
        setState,
        setModal,
        setToolsData,
        toolsData,
        markData,
        setMarkData,
      ]}
    >
      {modal && <Modal />}
      <Map />
      <Sidbar />
    </userContext.Provider>
  );
}

export default App;
