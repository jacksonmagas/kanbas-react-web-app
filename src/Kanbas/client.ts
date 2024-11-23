import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enroll = async (userId: string, courseId: string) => {
    axiosWithCredentials.post(`${ENROLLMENTS_API}`, {userId, courseId});
}

export const unenroll = async (userId: string, courseId: string) => {
    console.log(`Unenroll uid: ${userId} cid: ${courseId}`)
    axiosWithCredentials.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
}

export const getEnrollments = async (userId: string) => {
    const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/${userId}`);
    return data;
}
