import { IoEllipsisVertical } from "react-icons/io5";
import { MdUnpublished } from "react-icons/md";
import GreenCheckmark from "./GreenCheckmark";

interface LessonControlButtonsProps {
  published: boolean;
  onTogglePublish: () => void;
}

export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
