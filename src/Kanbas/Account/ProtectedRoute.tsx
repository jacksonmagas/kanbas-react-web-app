import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useKanbasSelector } from "../../hooks";

export function ProtectedRoute({ children, role }: { children: ReactNode, role?: string }) {
  const { currentUser } = useKanbasSelector(state => state.accountReducer);
  if (currentUser && (!role || currentUser.role === role)) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Account" />;
}}