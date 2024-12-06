import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { User } from "./reducer";
import { FaPlus } from "react-icons/fa";
export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentName, setName] = useState("");
  const [currentRole, setRole] = useState("");
  const { uid } = useParams();

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    if (user) {
      setUsers([...users, user]);
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    if (users) {
      setUsers(users);
    }
  };

  const filterUsers = async ({name, role} : {name?: string, role?: string}) => {
    if (role !== undefined) {
      setRole(role);
    } else {
      role = currentRole;
    }
    if (name !== undefined) {
      setName(name);
    } else {
      name = currentName
    }
    const users = await client.findFilteredUsers({role: role, name: name});
    if (users) {
      setUsers(users);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);
 return (
    <div>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>
      <h3>Users</h3>
      <input onChange={(e) => filterUsers({name: e.target.value})} placeholder="Search people"
             className="form-control float-start w-25 me-2 wd-filter-by-name" />
      <select value={currentRole} onChange={(e) => filterUsers({role: e.target.value})}
              className="form-select float-start w-25 wd-select-role" >
        <option value="">All Roles</option>    <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option> <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <PeopleTable users={users} />
    </div>
);}
