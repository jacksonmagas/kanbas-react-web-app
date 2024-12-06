import axios from "axios";
import { Credential } from "./Signin";
import { isUser, User } from "./reducer";
import { isCourse } from "..";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  if (!Array.isArray(response.data)) {
    return null;
  }
  return response.data.filter(isUser);
};

export const findFilteredUsers = async ({role, name} : {role?: string, name?: string}) => {
  const query = name || role ? "?" : "";
  const roleStr = role ? `role=${role}` : "";
  const nameStr = name ? `name=${name}` : "";
  const connector = name && role ? "&" : "";
  const response = await
    axios.get(`${USERS_API}${query}${roleStr}${connector}${nameStr}`);
  if (!Array.isArray(response.data)) {
    return null;
  }
  return response.data.filter(isUser);
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  if (!isUser(response.data)) {
    return null;
  }
  return response.data;
};

export const signin = async (credentials: Credential) => {
  console.log(process.env.REACT_APP_REMOTE_SERVER)
    const response = await axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
  if (!isUser(response.data)) {
    return null;
  }
  return response.data;
};

export const signup = async (user: Credential) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  if (!isUser(response.data)) {
    return null;
  }
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  if (!isUser(response.data)) {
    return null;
  }
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  if (!isUser(response.data)) {
    return null;
  }
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  if (!isUser(response.data)) {
    return null;
  }
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const findCoursesForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
  if (!Array.isArray(data)) {
    return null;
  }
  return data.filter(isCourse);
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
 const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
 return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
 const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
 return response.data;
};

