import CommenteElement from "./comment.element";
import NoDataView from "../noDataVIew/no.data.view";

export default function CommentList({comments}) {

  return (
    <div className="h-48 overflow-y-auto overflow-x-hidden px-2">
      {
       comments.length ?  comments.map((item,i)=>
       {
         return(
           <div key={i}>
             <CommenteElement comment={item}/>
           </div>
         )
       }) : <NoDataView text="Aucune(s) publication"/>
      }
    </div>
  );
}
