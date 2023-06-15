import { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get('/classes').then((res) => {
      setClasses(res.data);
    });
  }, [axiosSecure]); // Include axiosSecure as a dependency in the useEffect array

  // Filter classes to show only those with pending status
  const pendingClasses = classes.filter((item) => item.status === 'pending');

  return (
    <div className="w-full">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Status</th>
              <th>Total Enrolled Students</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingClasses.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.status}</td>
                <td>{item.enrolledStudents?.length || 0}</td>
                <td>{item.status === 'denied' ? item.feedback : '-'}</td>
                <td>
                  <button className="btn btn-primary btn-sm">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
