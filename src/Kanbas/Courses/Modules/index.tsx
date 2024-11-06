import ModulesControls from "./ModulesControls";
import "../../styles.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";
import { useState } from "react";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

function ModuleHeader({ module, isFaculty } :
  {module: any, isFaculty: boolean}) {
  const dispatch = useDispatch();
  const moduleId = module._id;
  return (
    <div className="wd-title p-3 ps-2 bg-secondary fs-5">
      {!module.editing && module.name}
      { module.editing && (
        <input className="form-control w-50 d-inline-block"
               onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
               onKeyDown={(e) => {
                 if (e.key === "Enter") {
                   dispatch(updateModule({ ...module, editing: false }));
                 }
               }}
               defaultValue={module.name}/>
      )}
      {isFaculty && <ModuleControlButtons moduleId={moduleId}
                            deleteModule={() => dispatch(deleteModule(moduleId))}
                            editModule={() => dispatch(editModule(moduleId))}/>}
    </div>
  );
}

export default function Modules() {
  const { cid } = useParams();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  return (
  <div>
    <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
        dispatch(addModule({name: moduleName, course: cid}));
        setModuleName("");
      }} /><br /><br /><br /><br />
    <ul id="wd-modules" className="list-group rounded-0">
      {modules
        .filter((module: any) => module.course === cid)
        .map((module: any) => (
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <ModuleHeader module={module} isFaculty={isFaculty}/>
          {module.lessons && (
            <ul className="wd-lessons list-group rounded-0">
              {module.lessons.map((lesson: any) => (
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                </li>
              ))}</ul>)}</li>))}
    </ul>
  </div>
);}
