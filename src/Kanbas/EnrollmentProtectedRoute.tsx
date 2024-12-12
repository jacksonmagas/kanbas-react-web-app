import { Navigate, useParams } from "react-router";
import { Course } from ".";
import { useKanbasSelector } from "../hooks";

export default function EnrollmentProtectedRoute({children, courses} : {children: React.ReactNode, courses: Course[]}) {
    const { cid } = useParams();
    const { currentUser } = useKanbasSelector(state => state.accountReducer);

    if (currentUser && (["FACULTY", "ADMIN"].includes(currentUser.role) || courses.some((c) => c._id === cid && c.enrolled)) || true) {
        return children;
    } else {
        return <Navigate to="/Kanbas/Dashboard" />;
    }
}