import { useRecoilState } from "recoil";
import { dashMenuState } from "../utils/states";
import SideBar from "../components/sideBar/side.bar";
import RigthBox from "../components/rightBox/rigth.box";
import PublicationList from "../components/publication/publication.list";
import Orientation from "../components/orientation/Orientation";
import { useEffect } from "react";
import { turnOffIo, turnOnIo } from "../utils/socket";
import MapComponent from "../components/map/map";

const components = {
    PublicationList,
    Orientation,
    MapComponent
}

export default function DashboarPage() {
    const dashMenuItem = useRecoilState(dashMenuState) 

    useEffect(()=>{
        turnOnIo()
        return ()=>{
            turnOffIo()
        }
    },[])
    const DynamicComponent = components[dashMenuItem[0]] ||  (() => <div className=" col-span-4">Not found</div>)

    return (
        <div className=" grid grid-cols-6 h-screen text-gray-300">
            <SideBar />            
            <DynamicComponent/>
            <RigthBox/>
        </div>
    )
}