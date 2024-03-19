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
import { socket } from "../../utils/socket";

// eslint-disable-next-line react/prop-types
export default function ModalPubImage({ images }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log("IMAGES : ",images)
  return (
    <>
      <div className="flex items-center text-gray-400" onClick={onOpen}>
        <p className=" text-xs ml-2 underline cursor-pointer">Voir plus</p>
      </div>
      <Modal size="full" backdrop={`blur`} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-[#2828289e] rounded-lg text-gray-300">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Images</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-4 gap-4 h-screen overflow-y-auto">
                  {images.map((item, key) => {
                    return <img key={key} src={item} alt="" />
                  })}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
