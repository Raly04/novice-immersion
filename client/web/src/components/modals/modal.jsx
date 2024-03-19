/** @format */

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import { BottomGradient, LabelInputContainer } from "../register/login";
import { Label } from "@radix-ui/react-label";
import LoadingBtn from "../loading.btn";
import { socket } from "../../utils/socket";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../utils/states";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function ModalFormBtn({ text }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [pubsImage, setPubsImage] = useState([]);
  const [btnState, setBtnState] = useState("idle");

  const resetState = () => {
    setDescription("");
    setTag("");
    setPubsImage([]); // Clear pubImage
    setBtnState("idle"); // Reset btnState
    setPubsImage([]);
  };

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const filesArray = Array.from(fileList);

    // Update state to store selected files
    setPubsImage(filesArray);
  };

  const handleSubmit = async (e) => {
    if (pubsImage.length) {
      //store in the database
      try {
        //Make POST request using Axios
        const res = await axios.post(
          "http://localhost:5000/api/create-pub",
          {
            user: currentUser,
            tag: tag,
            description: description,
            pubsImage: pubsImage.map((item) => item.name),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        //send pub assets
        const pub = res.data.pub;
        if (res?.data?.success) {
          const formData = new FormData();
          formData.append("publication_id", pub._id);
          pubsImage.forEach((file) => {
            formData.append("files", file);
          });
          const resAssets = await axios.post(
            "http://localhost:5000/api/upload-created-pub-assets",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          //send pub socket
          if (resAssets?.data?.success) {
            socket.emit("send_pub", res.data.pub);
            resetState();
          } else {
            alert("error uploading files");
          }
        }
      } catch (error) {
        console.log("ERROR : ", error);
      }
    } else {
      //store in the database
      try {
        //Make POST request using Axios
        const res = await axios.post("http://localhost:5000/api/create-pub", {
          user: currentUser,
          tag: tag,
          description: description,
          pubsImage: [],
        });
        if (res?.data?.success) {
          socket.emit("send_pub", res.data.pub);
          resetState();
        }
      } catch (error) {
        console.log("ERROR : ", error);
      }
    }
  };

  return (
    <>
      <Button
        className="py-2 px-4 bg-primary text-back rounded-full w-full"
        onPress={onOpen}
      >
        <IconPlus className="font-bold mx-2" />
        <p>{text}</p>
      </Button>
      <Modal backdrop={`blur`} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className=" bg-modalDarkBack rounded-lg text-gray-300">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Publier</ModalHeader>
              <ModalBody>
                <form
                  method="post"
                  className="my-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Ajouter un fichier</Label>
                    <input
                      multiple
                      onChange={handleFileChange}
                      className="bg-tertiary py-2 px-1 rounded-sm"
                      id="pubImage"
                      name="pubImage"
                      type="file"
                    />
                  </LabelInputContainer>

                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Ajouter du Tag</Label>
                    <input
                      className="bg-tertiary py-2 px-1 rounded-sm"
                      onChange={(e) => setTag(e.target.value)}
                      value={tag}
                      id="email"
                      placeholder="Ajouter du texte"
                      type="text"
                      name="tag"
                    />
                  </LabelInputContainer>

                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Ajouter du texte</Label>
                    <textarea
                      className="bg-tertiary py-2 px-1 rounded-sm"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      id="email"
                      placeholder="Ajouter du texte"
                      type="email"
                      name="description"
                    />
                  </LabelInputContainer>

                  <LoadingBtn
                    className="bg-secondary relative group/btn w-full text-zinc-800 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    handler={handleSubmit}
                    state={btnState}
                  >
                    Publier &rarr;
                    <BottomGradient />
                  </LoadingBtn>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
