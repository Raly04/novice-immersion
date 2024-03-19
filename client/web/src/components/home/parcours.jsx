import { parcoursEni } from "../../utils/const";
import { Tabs } from "../tabs";

export default function Parcours() {
  const tabs = [
    {
      title: "GB",
      value: "GB",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 text-xl md:text-4xl font-bold text-white bg-[#2D2D2D]">
          <DummyContent element={parcoursEni.GB} />
        </div>
      ),
    },
    {
      title: "IG",
      value: "IG",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 text-xl md:text-4xl font-bold text-white bg-[#2D2D2D]">
          <DummyContent element={parcoursEni.IG}/>
        </div>
      ),
    },
    {
      title: "ASR",
      value: "ASR",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 text-xl md:text-4xl font-bold text-white bg-[#2D2D2D]">
          <DummyContent element={parcoursEni.ASR} />
        </div>
      ),
    },
    {
      title: "OCC",
      value: "OCC",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 text-xl md:text-4xl font-bold text-white bg-[#2D2D2D]">
          <p className="explaint">{parcoursEni.explaint}</p>
          <DummyContent element={parcoursEni.OCC} />
        </div>
      ),
    },
    {
      title: "GID",
      value: "GID",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 md:text-4xl font-bold text-white bg-[#2D2D2D]">
          <DummyContent element={parcoursEni.GID} />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-8">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = ({ element }) => {
  return (
    <div className="text-sm">
      <img src={element.icon} alt="" className="px-10"/>
      <p className=" text-secondary text-xl text-center mb-4">{element.title}</p>
      <p className="explaint">{element.explaint}</p>
      <p className=" font-normal">{element.content}</p>
    </div>
  );
};
