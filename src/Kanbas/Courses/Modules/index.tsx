import ModulesControls from "./ModulesControls";
import "../../styles.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule, Module } from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { useKanbasDispatch, useKanbasSelector } from "../../../hooks";

function ModuleHeader({ module, isFaculty } :
  {module: Module, isFaculty: boolean}) {
  const dispatch = useKanbasDispatch();
  const saveModule = async (module: Module) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };
  const moduleId = module._id;
  return (
    <div className="wd-title p-3 ps-2 bg-secondary fs-5">
      {!module.editing && module.name}
      { module.editing && (
        <input className="form-control w-50 d-inline-block"
               onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
               onKeyDown={(e) => {
                 if (e.key === "Enter") {
                  saveModule({ ...module, editing: false });
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
  const { modules } = useKanbasSelector(state => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");
  const dispatch = useKanbasDispatch();

  const fetchModules = async () => {
    if (cid) {
      const modules = await coursesClient.findModulesForCourse(cid);
      dispatch(setModules(modules));
    }
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid, lessons: [], _id: "-1", description: "New Module", editing: false };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    if (module) {
      dispatch(addModule(module));
    }
  };

  const { currentUser } = useKanbasSelector(state => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  return (
  <div>
    <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={createModuleForCourse} /><br /><br /><br /><br />
    <ul id="wd-modules" className="list-group rounded-0">
      {modules
        .map(module => (
        <li className="wd-module list-group-item p-0 mb-5 fs-5">
          <ModuleHeader module={module} isFaculty={isFaculty}/>
          {module.lessons && (
            <ul className="wd-lessons list-group rounded-0">
              {module.lessons.map(lesson => (
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                </li>
              ))}</ul>)}</li>))}
    </ul>
  </div>
);}
