import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users');
    return res.data;
  });

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an admin now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleMakeInstructor = (user) => {
    fetch(`http://localhost:5000/users/instructor/${user._id}`, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an instructor now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  

  return (
    <div className="w-full">
      <h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'admin' ? (
                    'admin'
                  ) : (
                    <div>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost bg-blue-600 text-white"
                        disabled={user.role === 'instructor'}
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-ghost bg-green-600 text-white"
                        disabled={user.role === 'instructor' || user.role === 'admin'}
                      >
                        Make Instructor
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
