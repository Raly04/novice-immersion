import { IconMoodEmpty } from "@tabler/icons-react/dist/cjs/tabler-icons-react";

export default function NoDataView({text}){
    return (
        <div className="w-full flex-col items-center justify-center">
            <IconMoodEmpty/>
            <p>{text}</p>
        </div>
    )
}