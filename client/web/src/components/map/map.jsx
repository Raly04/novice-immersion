import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useRef, useState } from "react";
import osm from "../../utils/osm.provider";
import "leaflet/dist/leaflet.css";
import { Button } from "@nextui-org/react";
import {
  IconLocation,
  IconLocationSearch,
  IconMobiledata,
} from "@tabler/icons-react/dist/cjs/tabler-icons-react";
import useGeoLocation from "./useGeoLocation";
import Place from "./place.element"

export default function MapComponent() {
  const [center, setCenter] = useState({
    lat: -21.45502771429344,
    lng: 47.09325510658672,
  }); // Coordonnées de l'ENI, Fianarantsoa

  const ZOOM_LEVEL = 15;

  const location = useGeoLocation();

  const onLocateMe = () => {
    setCenter({ lat: location.coordinates.lat, lng: location.coordinates.lng });
  };

  const onLocateSchool = () => {
    setCenter({ lat: -21.45502771429344, lng: 47.09325510658672 });
  };

  const mapRef = useRef();
  return (
    <div className=" col-span-4 h-screen w-full relative">
      <div>
        <MapContainer
          style={{ zIndex: 10 }}
          center={center}
          zoom={ZOOM_LEVEL}
          ref={mapRef}
        >
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
          {location.loaded && !location.error && (
            <Marker position={center}>
              <Popup>
                ENI Fianarantosa. <br /> Ecole Nationale D'informatique
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <div className="absolute bg-white z-50 top-0 right-0 text-orBack p-2 flex-col ">
        <div>
          <p>Chercher une place</p>
          <div>
            <input type="search" name="" id="" className="bg-gray-200 focus:outline-none text-xs py-1 pl-2 rounded-full w-full"/>
            <div className="my-2">
              <Place/>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={onLocateMe}>
            <IconLocationSearch className="h-4 w-4 text-neutral-800 dark:text-secondary" />
            <p>Me trouver</p>
          </Button>
          <Button onClick={onLocateSchool}>
            <IconLocationSearch className="h-4 w-4 text-neutral-800 dark:text-secondary" />
            <p>Trouver l'ecole</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
