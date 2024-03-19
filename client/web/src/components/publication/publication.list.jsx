import { useEffect, useState } from "react";
import Publication from "./publication.box";
import { socket } from "../../utils/socket";
import axios from "axios";
import myaxios from "../../utils/axios";
import { Input } from "@nextui-org/react";

export default function PublicationList() {
  const [pubs, setPubs] = useState([]);

  const handleSocket = async (data) => {
    const updatedImages = await Promise.all(
          data.images.map(async (image) => {
            const imageData = await myaxios.get(
              `/pubs/${data._id}/images/${image}`
            );
            return imageData.data;
          })
        );
    setPubs((prevPub) => [...prevPub,{...data , images : updatedImages}]);
    const container = document.getElementById("pub-container")
    container.scrollTop = container.scrollHeight
  };

  useEffect(() => {
    getAllPubs();
    socket.on("receive_pub", handleSocket);
    // Clean up socket event listener to avoid memory leaks
    return () => {
      socket.off("receive_pub");
    };
  }, []);

  const getAllPubs = async () => {
    const res = await axios.get("http://localhost:5000/api/get-all-pubs");
    const updatedPubs = await Promise.all(
      res.data.pubs.map(async (pub) => {
        const updatedImages = await Promise.all(
          pub.images.map(async (image) => {
            const imageData = await myaxios.get(
              `/pubs/${pub._id}/images/${image}`
            );
            return imageData.data;
          })
        );
        return { ...pub, images: updatedImages };
      })
    );
    setPubs(updatedPubs);
  };
  return (
    <div className=" col-span-4 h-screen overflow-y-auto px-12 relative" id="pub-container">
      {pubs.map((item, key) => {
        return <Publication pub={item} key={key} />;
      })}
    </div>
  );
}
