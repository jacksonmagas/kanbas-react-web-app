import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ReactNode } from "react";

/**
 * Conditionally renders its children based on the user's role and view.
 *
 * @param {Object} props - The component's props.
 * @param {ReactNode} props.children - The content to render if the conditions are met.
 * @param {string} props.role - The role required to render the children (e.g., "FACULTY").
 * @param {boolean} props.loose Display the children if only role or view matches
 * @returns {JSX.Element} The rendered children if the conditions are met, or an empty `<div />` otherwise.
 *
 * @example
 * // Render content for faculty members in faculty view
 * <RoleView role="FACULTY">
 *   <p>Welcome, faculty member!</p>
 * </RoleView>
 *
 * @example
 * // Render content for students or anyone in student view
 * <RoleView role="STUDENT" loose>
 *   <p>Student Content</p>
 * </RoleView>
 */
export function RoleView({ children, role, loose = false }: { children: ReactNode, role: string, loose?: boolean }) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { currentView } = useSelector((state: RootState) => state.viewReducer);
  const compare = (l: boolean, r: boolean) => loose ? l || r : l && r;
  if (compare(currentUser?.role === role, currentView === role)) {
    return children;
  } else {
    return undefined;
}}
