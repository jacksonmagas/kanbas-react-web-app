import axios from "axios";
import { Course, isCourse } from "..";
import { Module, isModule } from "./Modules/reducer";
import { Assignment, isAssignment } from "./Assignments/reducer";
import { isUser } from "../Account/reducer";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

function exportCourse(c: Course) {
  let temp = c;
  delete temp.enrolled;
  return temp;
}

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  if (!Array.isArray(data)) {
    return null;
  }
  return data.filter(isCourse);
};

export const createCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}`, exportCourse(course));
  if (!isCourse(data)) {
    return null;
  }
  return data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/Quizzes`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/Quizzes`, quiz);
  return response.data;
};

export const updateQuizForCourse = async (quizId: string, quiz: any) => {
  const response = await axiosWithCredentials.put(`${COURSES_API}/Quizzes/${quizId}`, quiz);
  return response.data;
};

export const fetchUnenrolledCourses = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/not/${userId}`);
  return data;
}

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: Course) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, exportCourse(course));
  if (!isCourse(data)) {
    return null;
  }
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials
    .get(`${COURSES_API}/${courseId}/modules`);
  if (!Array.isArray(response.data)) {
    return null;
  }
  return response.data.map(d => ({ ...d, editing: false })).filter(isModule);
};

export const createModuleForCourse = async (courseId: string, module: Module) => {
  const toSend = { lessons: module.lessons, name: module.name, course: module.course, description: module.description };
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    toSend
  );
  if (response.data && typeof response.data === "object") {
    const result = { ...response.data, editing: false }
    if (!isModule(result)) {
      return null;
    }
    return result;
  } else {
    return null;
  }
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials
    .get(`${COURSES_API}/${courseId}/assignments`);
  if (!Array.isArray(response.data)) {
    return null;
  }
  return response.data.filter(isAssignment);
};

export const createAssignmentForCourse = async (courseId: string, assignment: Assignment) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  if (!isAssignment(response.data)) {
    return null;
  }
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
 const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
 if (!Array.isArray(response.data)) {
  return null;
 }
 return response.data.filter(isUser);
};
