import React, { useContext, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { userContext } from "../App";
import { storage } from "../fbconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Modal() {
  const regex = /^.{2,3}$/i;
  const [
    state,
    setState,
    setModal,
    setToolsData,
    toolsData,
    markData,
    setMarkData,
  ] = useContext(userContext);

  const [file, setFile] = useState(true);
  const [teamName, setTeamName] = useState(true);

  const handleInputName = (e) => {
    setTeamName((pre) => (pre = regex.test(e.target.value)));
  };

  const handleInputFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();

    const teamName = e.target.teamName.value;

    if (file && regex.test(teamName)) {
      const imgRef = ref(storage, "image");
      uploadBytes(imgRef, file).then(() => {
        getDownloadURL(imgRef).then((url) => {
          setMarkData({ url, teamName });
          // setFile(null);
        });
      });
      setModal(false);
    } else {
      setTeamName(false);
      setFile(false);
    }
  };

  return (
    <div className="modals  flex justify-center  h-[100vh] transition-opacity    items-center  w-[100vw]  duration-75   bg-[#0e0d0d83]   absolute top-0 left-0  bottom-0 right-0    z-[999999] ">
      <div className="bgs rounded-lg md:w-[20rem] md:h-[14rem]  sm:w-[15rem] sm:h-[15rem] relative  ">
        <span
          className="  absolute right-0 p-[.15rem]   text-[#ff3d00] opacity-80 hover:opacity-100 text-3xl cursor-pointer transition-opacity"
          onClick={() => setModal(false)}
        >
          <RiCloseCircleFill />
        </span>

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action="submit"
          onSubmit={handleSubmitFile}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="teamName"
            >
              Team Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="teamName"
              name="teamName"
              type="text"
              placeholder="Type Upto 3 Latter"
              onChange={handleInputName}
            />

            {!teamName && (
              <p className="text-sm text-red-600 ml-1 mt-1 transition-opacity ">
                please input min "2" & max "3" char
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Logo
            </label>
            <input
              className="form-control
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none   "
              type="file"
              accept="image/jpeg"
              id="formFile"
              onChange={handleInputFile}
            />
            {!file && (
              <p className="text-sm text-red-600 ml-1 mt-1 transition-opacity ">
                please input your team image
              </p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-[#ff3d00] px-2 py-1 hover:bg-[#ec3700] uppercase text-white font-bold btn-sm rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Marker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
