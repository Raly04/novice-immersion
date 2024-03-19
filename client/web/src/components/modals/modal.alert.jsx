/** @format */

import { useState } from "react";
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
  Card,
  CardBody,
  Image,
} from "@nextui-org/react";
import axios from "axios";
import { IconMessage, IconPlus } from "@tabler/icons-react";
import { BottomGradient, LabelInputContainer } from "../register/login";
import { Label } from "@radix-ui/react-label";
import icon1 from "../../assets/icon (1).png";

// eslint-disable-next-line react/prop-types
export default function ModalAlert() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [login, setLogin] = useState({ user: localStorage.getItem("id") });
  const handleChange = (e) => {
    setLogin((val) => {
      return {
        ...val,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {};

  return (
    <>
      <div className="w-20 h-20 rounded-full p-4 bg-secondary">
        <Card shadow="sm" isPressable onPress={onOpen}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="full"
              className="object-contain"
              src={icon1}
            />
          </CardBody>
        </Card>
      </div>
      <Modal
        size="2xl"
        backdrop={`blur`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-back rounded-lg text-gray-300">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Creer une alerte
              </ModalHeader>
              <ModalBody>
                <form method="post" className="mt-2" onSubmit={handleSubmit}>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Ajouter un fichier</Label>
                    <input
                      onChange={handleChange}
                      className="bg-tertiary py-2 px-1 rounded-sm"
                      color="tertiary"
                      id="password"
                      type="file"
                    />
                  </LabelInputContainer>

                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Laiser un commentaire</Label>
                    <textarea
                      className="bg-tertiary py-2 px-1 rounded-sm"
                      onChange={handleChange}
                      id="email"
                      placeholder="Ajouter du texte"
                      type="email"
                      name="description"
                    />
                  </LabelInputContainer>
                  <button
                    className="bg-secondary mb-4 relative group/btn w-full text-zinc-800 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                  >
                    Alerter &rarr;
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
