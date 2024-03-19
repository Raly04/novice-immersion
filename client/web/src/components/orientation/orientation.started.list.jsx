import React from "react";
import { Listbox, ListboxItem, cn } from "@nextui-org/react";
import {
    IconCloudComputing,
  IconEdit,
  IconRoad,
  IconRobot,
  IconSchool,
  IconSocial,
  IconUniverse,
} from "@tabler/icons-react";
import { ListboxWrapper } from "../list.box.wrapper";

export default function OrientationStartedList() {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <ListboxWrapper>
      <Listbox variant="flat" aria-label="Listbox menu with descriptions">
        <ListboxItem
          key="new"
          description="A propsos de l'ecole"
          startContent={<IconSchool color="#18c964" className={cn(iconClasses, "bg-[#18c9641a] w-8 h-8 p-1 rounded-sm")} />}
        >
          A propos de l'ecole
        </ListboxItem>
        <ListboxItem
          key="copy"
          description="A propos des Universite"
          startContent={<IconRobot color="#0070f0" className={cn(iconClasses, "bg-[#0070f01a] w-8 h-8 p-1 rounded-sm")} />}
        >
          Informatique avancee
        </ListboxItem>
        <ListboxItem
          key="edit"
          description="Debouches de travail"
          startContent={<IconSocial color="#9455d3" className={cn(iconClasses, "bg-[#9455d31a] w-8 h-8 p-1 rounded-sm")} />}
        >
          Debouches de travail
        </ListboxItem>
        <ListboxItem
          key="delete"
          description="Roamap"
          showDivider
          startContent={
            <IconRoad
              color="#f5a524" className={cn(iconClasses, "bg-[#f5a5241a] w-8 h-8 p-1 rounded-sm")}
            />
          }
        >
          Roamap pour debutant
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}
