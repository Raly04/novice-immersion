import TechCard from "../tech.card";
import tipsIcon from "../../assets/appdev.jpg";
import netIcon from "../../assets/netsec.jpg";
import iaIcon from "../../assets/ia.jpg";
import dataIcon from "../../assets/data.jpg";
import cloudIcon from "../../assets/cloud.jpg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AdvancedComputerScience() {
  var settings = {
    dots: true,
    infinite: true,
    draggable:true,
    speed: 500,
    slidesToShow: 4,
    autoPlaySpeed : 2000,
    autoPlay : true,
    slidesToScroll: 1,
  };
  return (
    <div className=" py-6 bg-orBack">
      <p className=" text-4xl pl-6 pb-6">Nowadays technologies</p>
      <Slider {...settings}>
        <TechCard img={tipsIcon} title="Application developpement" content="HAHAHAHAHAHAHHA"/>
        <TechCard img={netIcon} title="Network administration" content="HAHAHAHAHAHAHHA"/>
        <TechCard img={dataIcon} title="Data engineer" content="HAHAHAHAHAHAHHA"/>
        <TechCard img={iaIcon} title="Intelligence artificial" content="HAHAHAHAHAHAHHA"/>
        <TechCard img={cloudIcon} title="Cloud computing" content="HAHAHAHAHAHAHHA"/>
      </Slider>
    </div>
  );
}
