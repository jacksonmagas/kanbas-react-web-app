import { Navigate, useParams } from "react-router";
import { useKanbasSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setEnrollments } from "../enrollmentsReducer";
import * as client from "../client";

export default function EnrollmentProtectedRoute({children} : {children: React.ReactNode}) {
    const { cid } = useParams();
    const { currentUser } = useKanbasSelector(state => state.accountReducer);
    const { enrollments } = useKanbasSelector(state => state.enrollmentsReducer);
    const dispatch = useDispatch();

    const fetchEnrollments = async () => {
        try {
        const enrollments = await client.getEnrollments(currentUser?._id ?? "");
        dispatch(setEnrollments(enrollments));
        } catch (error) {
        console.error(error);
        }
    }
    useEffect(() => {
        fetchEnrollments();
    }, []);

    if (!enrollments.some((e) => {console.log(e); return e.user === currentUser?._id && e.course === cid})) {
        return <Navigate to="/Kanbas/Dashboard" />;
    } else {
        return children;
    }
}