/** @format */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import ModalComment from "../modals/modal.comment";
import {
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react/dist/cjs/tabler-icons-react";
import ModalPubImage from "../modals/modal.pub.image";
import { socket } from "../../utils/socket";
import myaxios from "../../utils/axios";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../utils/states";

export default function Publication({ key, pub }) {
  const [react, setReact] = useState(pub?.reaction?.length);
  const [isLoved, setIsLoved] = useState(false);
  const [nbreComment, setNbreComment] = useState(pub?.comment?.length);
  const currentUser = useRecoilState(currentUserState);
  const [react_id, setReact_id] = useState(null);

  //handle reaction
  const checkIfUserHasReactOrNot = async () => {
    const res = await myaxios.get(
      `/check-reaction/${currentUser[0]._id}/${pub._id}`
    );
    if (res?.data?.success) {
      setIsLoved(res.data.hasReact);
      setReact_id(res.data.react_id);
    }
  };

  useEffect(() => {
    //handle react on real time
    checkIfUserHasReactOrNot();
    socket.on("receive_comment", (data) => {
      if (pub._id == data._doc._id) {
        setNbreComment((nbreComment) => nbreComment + 1);
      }
    });

    socket.on("receive_react", (data) => {
      if (pub._id == data.publication_id) {
        switch (data.action) {
          case "add":
            setReact((prevReact) => prevReact + 1);
            break;
          case "delete":
            setReact((prevReact) => prevReact - 1);
            break;
          default:
            break;
        }
      }
    });
    // Clean up socket event listener to avoid memory leaks
    return () => {
      socket.off("receive_comment");
    };
  }, []);

  const handleReaction = async () => {
    try {
      if (isLoved) {
        if (!react_id) return;
        const body = {
          publication_id: pub._id,
          content: react_id,
          action: "delete",
        };
        const res = await myaxios.post("/reagir", body);

        if (res?.data?.success) {
          socket.emit("send_react", body);
          setIsLoved(!isLoved);
        }
      } else {
        const body = {
          publication_id: pub._id,
          content: currentUser[0]._id,
          action: "add",
        };
        const res = await myaxios.post("/reagir", body);
        if (res?.data?.success) {
          socket.emit("send_react", body);
          setReact_id(res.data.react._id);
          setIsLoved(!isLoved);
        }
      }
    } catch (error) {
      console.log("ERROR WHEN REACTING TO PUB : ", error);
    }
  };

  return (
    <Card key={key} className="text-gray-300 bg-orBack p-5 rounded-xl my-12">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="lg"
            name={pub?.user[0]?.username}
            defaultValue={pub?.user[0]?.username}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none">
              {pub?.user[0]?.username}
            </h4>
            <p className=" text-xs text-gray-400">{pub?.createdAt}</p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small h- overflow-hidden">
        <p className=" p-2">{pub?.description}</p>
        <div className=" flex items-center justify-center">
          {/* <img src={sary} className=" rounded-lg w-full object-cover" /> */}
        </div>
        <span className="p-2">
          #{pub?.tag}
          <div className=" w-full max-h-[400px]">
            {pub?.images?.length && (
              <img
                src={pub?.images[0]}
                className=" w-full max-h-[400px] object-cover rounded-md"
              />
            )}
          </div>
        </span>
      </CardBody>
      <CardFooter className="gap-3 flex justify-between">
        <div className=" flex items-center gap-4">
          {isLoved ? (
            <div className="flex items-center gap-1">
              <button onClick={handleReaction}>
                <IconHeartFilled className=" text-red-500" />
              </button>
              {react}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button onClick={handleReaction}>
                <IconHeart />
              </button>
              {react || 0}
            </div>
          )}
          <div className="flex gap-1">
            <ModalComment publication={pub} />{" "}
            {/* {comment && comment.length} */}
            {nbreComment || 0}
          </div>
        </div>
        {pub?.images?.length > 1 && <ModalPubImage images={pub?.images} />}
      </CardFooter>
    </Card>
  );
}
