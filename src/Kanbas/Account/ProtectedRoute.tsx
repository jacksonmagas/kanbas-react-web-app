import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

export function ProtectedRoute({ children, role }: { children: ReactNode, role?: string }) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  if (currentUser && (!role || currentUser.role === role)) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Account" />;
}}