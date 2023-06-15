import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageClass = () => {
  const [classes, setClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get('/classes').then((res) => {
      setClasses(res.data);
    });
  }, []);

  const handleApprove = (classId) => {
    const updatedClass = {
      status: 'approved',
    };

    axiosSecure.patch(`/classes/${classId}`, updatedClass).then((res) => {
      if (res.data.success) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Class approved successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        setClasses((prevClasses) => {
          const updatedClasses = prevClasses.map((item) => {
            if (item._id === classId) {
              return { ...item, status: 'approved' };
            }
            return item;
          });
          return updatedClasses;
        });
      }
    });
  };

  const handleDeny = (classId) => {
    const updatedClass = {
      status: 'denied',
    };

    axiosSecure.patch(`/classes/${classId}`, updatedClass).then((res) => {
      if (res.data.success) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Class denied successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        setClasses((prevClasses) => {
          const updatedClasses = prevClasses.map((item) => {
            if (item._id === classId) {
              return { ...item, status: 'denied' };
            }
            return item;
          });
          return updatedClasses;
        });
      }
    });
  };

  const handleSendFeedback = (classId) => {
    Swal.fire({
      title: 'Send Feedback',
      input: 'text',
      inputPlaceholder: 'Enter feedback message',
      showCancelButton: true,
      confirmButtonText: 'Send',
      cancelButtonText: 'Cancel',
      preConfirm: (message) => {
        const feedback = {
          message,
        };
        return axiosSecure
          .post(`/classes/${classId}/feedback`, feedback)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Feedback sent successfully',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      },
    });
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => {
              if (item.status === 'pending') {
                return (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image}
                        alt="Class"
                        className="w-16 h-16"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.instructorName}</td>
                    <td>{item.instructorEmail}</td>
                    <td>{item.availableSeats}</td>
                    <td>{item.price}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleApprove(item._id)}
                        disabled={item.status !== 'pending'}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => handleDeny(item._id)}
                        disabled={item.status !== 'pending'}
                      >
                        Deny
                      </button>
                      <button
                        className="btn btn-secondary btn-sm ml-2"
                        onClick={() => handleSendFeedback(item._id)}
                        disabled={item.status !== 'pending'}
                      >
                        Send Feedback
                      </button>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClass;
