import { IconArrowRight, IconEye, IconLoader, IconMenu, IconMenu2 } from "@tabler/icons-react";

export default function TechCard({img,title,content}) {
  return (
    <div className="card mx-4">
      <img src={img} alt="" className="w-full h-32 sm:h-48 object-cover" />
      <div className="m-4">
        <span className="font-bold">{title}</span>
        <span className="block">{content}</span>
      </div>
      <div className="badge flex">
        <IconArrowRight className="w-4 h-4"/>
        <span className="ml-1">More</span>
      </div>
    </div>
  );
}
