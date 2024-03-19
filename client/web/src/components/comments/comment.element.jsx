import { Avatar } from "@nextui-org/react";

export default function CommenteElement({ comment }) {
  return (
    <div className=" flex items-center justify-start py-4 w-full">
      <Avatar name={comment.user.username} className=" w-[50px] h-[50px]"/>
      <div className="bg-tertiary rounded-tr-md rounded-br-md rounded-bl-md p-2 ml-4">
        <p className="text-sm">{comment.text}</p>
      </div>
    </div>
  );
}
