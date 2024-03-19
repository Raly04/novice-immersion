/** @format */

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  input,
} from "@nextui-org/react";
import axios from "axios";
import { IconMessage, IconPlus } from "@tabler/icons-react";
import { BottomGradient, LabelInputContainer } from "../register/login";
import { Label } from "@radix-ui/react-label";

import CommentList from "../comments/comment.list";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../utils/states";
import { socket } from "../../utils/socket";

// eslint-disable-next-line react/prop-types
export default function ModalComment({ publication }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPubComments();
    socket.on("receive_comment", (data) => {
      if (publication._id == data._doc._id) {
        setComments((prevComment) => [data.comment, ...prevComment]);
      }
    });

    // Clean up socket event listener to avoid memory leaks
    return () => {
      socket.off("receive_comment");
    };
  }, []);

  const getPubComments = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/pub-commentaire/${publication._id}`
    );
    console.log("ALL COMMENTS : ", res.data);
    setComments(res.data.comments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/commentaire", {
      text: comment,
      user: currentUser,
      publication: publication._id,
    });
    if (res?.data?.success) {
      socket.emit("send_comment", res.data.comment);
    }
    setComment("");
  };

  return (
    <>
      <button onClick={onOpen}>
        <IconMessage />
      </button>
      <Modal
        size="2xl"
        backdrop={`blur`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-modalDarkBack rounded-lg text-gray-300">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Commentaires
              </ModalHeader>
              <ModalBody>
                <CommentList comments={comments} />
                <form className="mt-2" onSubmit={handleSubmit}>
                  <div className=""></div>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Laiser un commentaire</Label>
                    <textarea
                      className="bg-tertiary py-2 px-1 rounded-sm"
                      onChange={(e) => setComment(e.target.value)}
                      id="email"
                      placeholder="Ajouter du texte"
                      value={comment}
                      name="text"
                    />
                  </LabelInputContainer>
                  <button
                    className="bg-secondary mb-4 relative group/btn w-full text-zinc-800 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                  >
                    Commenter &rarr;
                    <BottomGradient />
                  </button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
