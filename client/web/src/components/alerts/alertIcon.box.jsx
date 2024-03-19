import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function AlertIconBox({title , img , bg}) {

  return (
    <div className={`w-20 h-20 rounded-full p-4 bg-${bg}`}>
        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="full"
              alt={title}
              className="object-contain"
              src={img}
            />
          </CardBody>
        </Card>
    </div>
  );
}
