import { useState } from "react";
import { useRecoilState } from "recoil";
import { dashMenuState } from "../../utils/states";
import { IconBodyScan, IconBuildingCommunity, IconFileOrientation, IconInfoCircle, IconLane, IconMap, IconMap2, IconRoadSign, IconWindsock } from "@tabler/icons-react/dist/cjs/tabler-icons-react";

const Menus = [
  // { title: "Dashboard", src: "Chart_fill", isSelected: true },
  { title: "Orientantion ",  icon : <IconWindsock /> , isSelected: true ,value : "Orientation"},
  { title: "Communauté",  icon : <IconBuildingCommunity /> , isSelected: false, value : "PublicationList"},
  { title: "Map", icon : <IconMap2 /> , gap: false, isSelected: false , value : "MapComponent" },
  { title: "Compte", icon : <IconInfoCircle /> , gap: true, isSelected: false },
  { title: "Analytics", src: "Chart" },
  { title: "Setting", src: "Setting", isSelected: false },
];

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [menus, setMenuState] = useState(Menus);
  const [dashMenu,setDashMenu] = useRecoilState(dashMenuState)

  const setActiveItem = (item) => {
    setDashMenu(item.value)
    setMenuState(
      menus.map((i) => {
        if (i == item) {
          return { ...i, isSelected: true };
        } else {
          return { ...i, isSelected: false };
        }
      })
    );
  };

  return (
    <div
      className={` ${open ? "w-full" : "w-20 "
        } bg-orBack h-screen p-5  pt-8 relative duration-300`}
    >
      <img
        src="./src/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/logo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
            }`}
        />
        <h1
          className={` origin-left font-medium text-xl duration-200 ${!open && "scale-0"
            }`}
        >
          ENI Emerssion
        </h1>
      </div>
      <ul className="pt-6">
        {menus.map((item, key) => {
          if (item.isSelected) {
            return (
              <li
                onClick={() => setActiveItem(item)}
                key={key}
                className={`flex  rounded-md p-2 cursor-pointe bg-secondary text-tertiary text-sm items-center gap-x-4 
                        ${item.gap ? "mt-9" : "mt-2"} ${key === 0 && "bg-light-white"
                  } `}
              >
                {item.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {item.title}
                </span>
              </li>
            );
          } else {
            return (
              <li
                onClick={() => setActiveItem(item)}
                key={key}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-tertiary transition duration-300 ease-linear text-gray-300 text-sm items-center gap-x-4 
                        ${item.gap ? "mt-9" : "mt-2"} ${key === 0 && "bg-light-white"
                  } `}
              >
                {item.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {item.title}
                </span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
