import { Navigate, useParams } from "react-router";
import { useKanbasSelector } from "../hooks";

export default function EnrollmentProtectedRoute({children} : {children: React.ReactNode}) {
    const { cid } = useParams();
    const { currentUser } = useKanbasSelector(state => state.accountReducer);
    const { enrollments } = useKanbasSelector(state => state.enrollmentsReducer);
    if (!enrollments.some((e) => e.user === currentUser?._id && e.course === cid)) {
        return <Navigate to="/Kanbas/Dashboard" />;
    } else {
        return children;
    }
}