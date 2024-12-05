import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ReactNode } from "react";

export function StudentView({ children }: { children: ReactNode }) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { currentView } = useSelector((state: RootState) => state.viewReducer);
  if (currentUser?.role === "STUDENT" || currentView === "STUDENT") {
    return children;
  } else {
    return <div/>;
}}

export function FacultyView({ children }: { children: ReactNode }) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { currentView } = useSelector((state: RootState) => state.viewReducer);
  if (currentUser?.role === "FACULTY" && currentView === "FACULTY") {
    return children;
  } else {
    return <div/>;
}}
