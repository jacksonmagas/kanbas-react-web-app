import axios from "axios";
import { Assignment } from "./reducer";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
export const updateAssignment = async (assignment: Assignment) => {
  const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

export const deleteAssignment = async (assignment: Assignment) => {
    const status = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignment._id}`);
    return status;
};