import { useSelector } from "react-redux";
import { User } from "./reducer";

export function StudentView({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { view } = useSelector((state: any) => state.viewReducer);
  if (currentUser?.role === "STUDENT" || view === "STUDENT") {
    return children;
  } else {
    return <div/>;
}}

export function FacultyView({ children }: { children: any }) {
  const { currentUser } : { currentUser : User | undefined} = useSelector((state: any) => state.accountReducer);
  const { view } : { view : string | undefined} = useSelector((state: any) => state.viewReducer);
  if (currentUser?.role === "FACULTY" && view === "FACULTY") {
    return children;
  } else {
    return <div/>;
}}
