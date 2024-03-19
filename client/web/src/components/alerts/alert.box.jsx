import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import icon2 from "../../assets/icon (2).png";
import icon3 from "../../assets/icon (5).png";
import icon4 from "../../assets/icon (4).png";
import alertIcon from "../../assets/alerte.png"
import ModalAlert from "../modals/modal.alert"

export default function AlertBox() {
  return (
    <div className="text-gray-300 text-lg flex-col items-center">
      <div className="flex items-end justify-center border-b pb-2 ">
        <img src={alertIcon} alt="" className="w-12 mr-4" />
        <p>Creer une alerte</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-48 h-48 grid grid-cols-2 grid-rows-2 gap-8 mt-4">
          <div className="flex items-center justify-center">
            <ModalAlert/>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-full p-4 bg-ii">
              <Card
                shadow="sm"
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="full"
                    className="object-contain"
                    src={icon2}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-full p-4 bg-iii">
              <Card
                shadow="sm"
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="full"
                    className="object-contain"
                    src={icon3}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-full p-4 bg-iiii">
              <Card
                shadow="sm"
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="full"
                    className="object-contain"
                    src={icon4}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
